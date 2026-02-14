import { useState } from "react";
import { useSearchMovies } from "../hooks";
import type { Movie } from "../../../services/tmdb";
import SearchResultsLimiter from "./SearchResultsLimiter";
import PageNumbers from "./PageNumbers";

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

  const handlePreviousPage = () => {
    if (!canGoPrev) return;
    setPage((value) => Math.max(1, value - 1));
  };

  const handleNextPage = () => {
    if (!canGoNext) return;
    setPage((value) => value + 1);
  };

  const limitedResults = results.slice(0, displayLimit);

  const renderResults = () => {
    if (!results.length && !isLoading) {
      return <p>No movies found for this search.</p>;
    }

    return (
      <div>
        <PageNumbers page={page} totalPages={totalPages} />
        <ul>
          {limitedResults.map((movie: Movie) => (
            <li key={movie.id}>
              <p>{movie.title}</p>
              <p>{movie.overview}</p>
              <p>{movie.popularity}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleSearch} disabled={isSearchDisabled}>
        Search
      </button>

      <SearchResultsLimiter
        value={displayLimit}
        onChange={(limit) => setDisplayLimit(limit)}
      />

      {data && renderResults()}

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {data && (
        <div>
          <PageNumbers page={page} totalPages={totalPages} />
          {page !== 1 && (
            <button onClick={handlePreviousPage} disabled={!canGoPrev}>
              previous page
            </button>
          )}

          <button onClick={() => setPage(1)} disabled={!canGoPrev}>
            back to first page
          </button>
          <button onClick={handleNextPage} disabled={!canGoNext}>
            next page
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchMovies;
