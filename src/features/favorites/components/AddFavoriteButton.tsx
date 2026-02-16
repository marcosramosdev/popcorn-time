import { useMemo, useState, useCallback } from "react";
import { useFavorites } from "../../../hooks/useFavorites";
import type { Movie } from "../../../services/tmdb";
import { cn } from "@/lib/utils";

type Props = {
  movieData: Movie;
};

function AddFavoriteButton({ movieData }: Props) {
  const { addToFavorites, getFavorites } = useFavorites();
  const [animating, setAnimating] = useState(false);

  const movieDataToStore = useMemo(
    () => ({
      id: movieData.id,
      title: movieData.title,
      rating: movieData.rating,
      poster_path: movieData.poster_path,
    }),
    [movieData],
  );

  const isFavorited = getFavorites().some((f) => f.id === movieData.id);

  const handleAddToFavorites = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isFavorited) return;

      addToFavorites(movieDataToStore);
      setAnimating(true);
      setTimeout(() => setAnimating(false), 400);
    },
    [addToFavorites, movieDataToStore, isFavorited],
  );

  return (
    <button
      onClick={handleAddToFavorites}
      disabled={isFavorited}
      aria-label={isFavorited ? "Already in favorites" : "Add to favorites"}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-md p-1 transition-colors",
        isFavorited
          ? "text-primary cursor-default"
          : "text-muted-foreground hover:text-primary",
        animating && "animate-heart-pop",
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={isFavorited ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    </button>
  );
}

export default AddFavoriteButton;
