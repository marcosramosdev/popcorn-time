import { useState } from "react";
import { Link } from "react-router-dom";
import { useSearchMovies } from "../hooks";
import type { Movie } from "../../../services/tmdb";
import { tmdbImageUrl, POSTER_DIMENSIONS } from "../../../services/tmdb";
import SearchResultsLimiter from "./SearchResultsLimiter";
import PageNumbers from "./PageNumbers";
import AddFavoriteButton from "../../favorites/components/AddFavoriteButton";
import LazyImage from "@/components/LazyImage";
import EmptyState from "@/components/EmptyState";
import ErrorBlock from "@/components/ErrorBlock";
import PageSkeleton from "@/components/PageSkeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function SearchMovies() {
  const [queryValue, setQueryValue] = useState("batman");
  const [inputValue, setInputValue] = useState("batman");
  const [page, setPage] = useState(1);
  const [displayLimit, setDisplayLimit] = useState(10);

  const { data, isLoading, error } = useSearchMovies(page, queryValue);

  const results = data?.results ?? [];
  const totalResults = data?.total_results ?? 0;
  const totalPages = totalResults ? Math.ceil(totalResults / displayLimit) : 0;
  const canGoPrev = page > 1;
  const canGoNext = totalPages ? page < totalPages : false;
  const isSearchDisabled = !inputValue.trim();

  const handleSearch = () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;
    setPage(1);
    setQueryValue(trimmedValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handlePreviousPage = () => {
    if (!canGoPrev) return;
    setPage((value) => Math.max(1, value - 1));
  };

  const handleNextPage = () => {
    if (!canGoNext) return;
    setPage((value) => value + 1);
  };

  const limitedResults = results.slice(0, displayLimit);

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <Input
            type="text"
            placeholder="Search for movies..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-9"
          />
        </div>
        <Button onClick={handleSearch} disabled={isSearchDisabled}>
          Search
        </Button>
      </div>

      {/* Results limiter */}
      <SearchResultsLimiter
        value={displayLimit}
        onChange={(limit) => {
          setDisplayLimit(limit);
          setPage(1);
        }}
      />

      {/* Loading state */}
      {isLoading && <PageSkeleton />}

      {/* Error state */}
      {error && (
        <ErrorBlock
          message={`Search failed: ${error.message}`}
          onRetry={handleSearch}
        />
      )}

      {/* Empty state — query executed, no results */}
      {data && !results.length && !isLoading && (
        <EmptyState
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
              <path d="M8 11h6" />
            </svg>
          }
          title="No movies found"
          description={`We couldn't find any movies matching "${queryValue}". Try a different search term.`}
        />
      )}

      {/* Results grid */}
      {data && limitedResults.length > 0 && (
        <>
          {/* Top pagination info */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {totalResults.toLocaleString()} result{totalResults !== 1 ? "s" : ""} found
            </p>
            <PageNumbers page={page} totalPages={totalPages} />
          </div>

          {/* Movie card grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {limitedResults.map((movie: Movie, index: number) => (
              <div
                key={movie.id}
                className="group animate-fade-up"
                style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
              >
                <Link to={`/movies/${movie.id}`} className="block">
                  <div className="relative overflow-hidden rounded-xl bg-muted shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                    {movie.poster_path ? (
                      <LazyImage
                        src={tmdbImageUrl(movie.poster_path, "w342")}
                        alt={`${movie.title} poster`}
                        width={POSTER_DIMENSIONS.w342.width}
                        height={POSTER_DIMENSIONS.w342.height}
                        className="rounded-xl"
                      />
                    ) : (
                      <div className="flex aspect-[2/3] items-center justify-center bg-muted text-xs text-muted-foreground">
                        No image
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </Link>

                <div className="mt-2 space-y-1 px-0.5">
                  <div className="flex items-start justify-between gap-1">
                    <Link to={`/movies/${movie.id}`} className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                        {movie.title}
                      </h3>
                    </Link>
                    <AddFavoriteButton movieData={movie} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination controls */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(1)}
              disabled={!canGoPrev}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m11 17-5-5 5-5" />
                <path d="m18 17-5-5 5-5" />
              </svg>
              <span className="sr-only">First page</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={!canGoPrev}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span className="ml-1">Previous</span>
            </Button>

            <PageNumbers page={page} totalPages={totalPages} />

            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={!canGoNext}
            >
              <span className="mr-1">Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default SearchMovies;
