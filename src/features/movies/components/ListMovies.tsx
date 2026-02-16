import { useEffect, useRef, useCallback } from "react";
import type { Movie } from "../../../services/tmdb";
import { tmdbImageUrl, POSTER_DIMENSIONS } from "../../../services/tmdb";
import { usePopularMovies } from "../hooks";
import { Link } from "react-router-dom";
import AddFavoriteButton from "../../favorites/components/AddFavoriteButton";
import LazyImage from "@/components/LazyImage";
import PageSkeleton from "@/components/PageSkeleton";
import ErrorBlock from "@/components/ErrorBlock";
import { Skeleton } from "@/components/ui/skeleton";

function ListMovies() {
  const {
    movies,
    error,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = usePopularMovies();

  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "200px",
    });
    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [handleObserver]);

  if (isLoading) return <PageSkeleton />;
  if (error) return <ErrorBlock message="Failed to load movies." />;

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie: Movie, index: number) => (
          <div
            key={movie.id}
            className="group animate-fade-up"
            style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
          >
            <Link to={`/movies/${movie.id}`} className="block">
              <div className="relative overflow-hidden rounded-xl bg-muted shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                {/* Poster */}
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

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </Link>

            {/* Info below card */}
            <div className="mt-2 space-y-1 px-0.5">
              <div className="flex items-start justify-between gap-1">
                <Link to={`/movies/${movie.id}`} className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {movie.title}
                  </h3>
                </Link>
                <AddFavoriteButton movieData={movie} />
              </div>
              {movie.rating > 0 && (
                <p className="text-xs text-muted-foreground">
                  Rating: {movie.rating.toFixed(1)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Sentinel + loading more */}
      <div ref={sentinelRef} className="py-8">
        {isFetchingNextPage && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[2/3] w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ListMovies;
