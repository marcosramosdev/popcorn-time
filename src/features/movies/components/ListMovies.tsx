import { useEffect, useRef, useCallback } from "react";
import type { Movie } from "../../../services/tmdb";
import { usePopularMovies } from "../hooks";
import { Link } from "react-router-dom";

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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching movies</p>;

  return (
    <div>
      <ul>
        {movies.map((movie: Movie) => (
          <li key={movie.id}>
            <div>
              {movie.id} - {movie.title} - {movie.rating} - {movie.poster_path}
              <Link to={`/movies/${movie.id}`}>more details</Link>
            </div>
          </li>
        ))}
      </ul>
      <div ref={sentinelRef}>
        {isFetchingNextPage && <p>Loading more...</p>}
      </div>
    </div>
  );
}

export default ListMovies;
