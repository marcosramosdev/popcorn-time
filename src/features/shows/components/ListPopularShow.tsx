import { useCallback, useEffect, useRef } from "react";
import type { Show } from "../../../services/tmdb";
import { usePopularShows } from "../hooks";

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
      rootMargin: "10px",
    });
    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [handleObserver]);

  const renderShows = () => {
    if (!shows) return null;
    return shows.map((show: Show) => {
      return (
        <li key={show.id}>
          <p>{show.name}</p>
          <p>{show.overview}</p>
          <strong>{show.popularity}</strong>
        </li>
      );
    });
  };

  return (
    <div>
      <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error fetching popular shows.</p>}
        <ul>{shows && renderShows()}</ul>
      </div>

      <div ref={sentinelRef}>
        {isFetchingNextPage && <p>Loading more...</p>}
      </div>
    </div>
  );
}

export default ListPopularShow;
