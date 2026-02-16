import { useState } from "react";
import { useFavorites } from "../../../hooks/useFavorites";
import type { FavoriteMovie } from "../../../store/favoritesStore";
import FavoriteCard from "./FavoriteCard";
import EmptyState from "@/components/EmptyState";

function ListFavorites() {
  const { getFavorites, removeFromFavorites } = useFavorites();
  const [favorites, setFavorites] = useState(getFavorites());

  const handleRemoveFavorite = (movieId: number) => {
    removeFromFavorites(movieId);
    const newFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(newFavorites);
  };

  if (favorites.length === 0) {
    return (
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
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        }
        title="No favorites yet"
        description="Browse movies and tap the heart icon to save your favorites here."
        actionLabel="Explore movies"
        actionTo="/movies"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {favorites.map((movie: FavoriteMovie) => (
        <FavoriteCard
          key={movie.id}
          movie={movie}
          onRemove={handleRemoveFavorite}
        />
      ))}
    </div>
  );
}

export default ListFavorites;
