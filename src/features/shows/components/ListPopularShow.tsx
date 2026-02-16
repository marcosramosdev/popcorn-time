import { useCallback, useEffect, useRef } from "react";
import type { Show } from "../../../services/tmdb";
import { tmdbImageUrl, POSTER_DIMENSIONS } from "../../../services/tmdb";
import { usePopularShows } from "../hooks";
import LazyImage from "@/components/LazyImage";
import PageSkeleton from "@/components/PageSkeleton";
import ErrorBlock from "@/components/ErrorBlock";
import { Skeleton } from "@/components/ui/skeleton";

function ListPopularShow() {
  const {
    shows,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePopularShows();

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
  if (error) return <ErrorBlock message="Failed to load shows." />;

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {shows.map((show: Show, index: number) => (
          <div
            key={show.id}
            className="group animate-fade-up"
            style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
          >
            <div className="relative overflow-hidden rounded-xl bg-muted shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
              {/* Poster */}
              {show.poster_path ? (
                <LazyImage
                  src={tmdbImageUrl(show.poster_path, "w342")}
                  alt={`${show.name} poster`}
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

            {/* Info below card */}
            <div className="mt-2 space-y-1 px-0.5">
              <h3 className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                {show.name}
              </h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {show.vote_average > 0 && (
                  <span className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-yellow-500"
                      aria-hidden="true"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    {show.vote_average.toFixed(1)}
                  </span>
                )}
                {show.first_air_date && (
                  <span>{show.first_air_date.slice(0, 4)}</span>
                )}
              </div>
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

export default ListPopularShow;
