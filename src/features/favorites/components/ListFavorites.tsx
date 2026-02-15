import { useState } from "react";
import { useFavorites } from "../../../hooks/useFavorites";
import type { FavoriteMovie } from "../../../store/favoritesStore";
import FavoriteCard from "./FavoriteCard";

function ListFavorites() {
  const { getFavorites, removeFromFavorites } = useFavorites();
  const [favorites, setFavorites] = useState(getFavorites());

  const handleRemoveFavorite = (movieId: number) => {
    removeFromFavorites(movieId);
    const newFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(newFavorites);
  };

  const renderFavorites = () => {
    if (favorites?.length === 0) {
      return <p>No favorites yet.</p>;
    }
    return (
      <ul>
        {favorites?.map((movie: FavoriteMovie) => (
          <FavoriteCard
            key={movie.id}
            movie={movie}
            onRemove={handleRemoveFavorite}
          />
        ))}
      </ul>
    );
  };

  return (
    <div>
      list of all favorites
      {renderFavorites()}
    </div>
  );
}

export default ListFavorites;
