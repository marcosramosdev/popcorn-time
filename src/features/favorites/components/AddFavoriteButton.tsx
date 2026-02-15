import { useMemo } from "react";
import { useFavorites } from "../../../hooks/useFavorites";
import type { Movie } from "../../../services/tmdb";

type Props = {
  movieData: Movie;
};

function AddFavoriteButton({ movieData }: Props) {
  const { addToFavorites } = useFavorites();

  const movieDataToStore = useMemo(
    () => ({
      id: movieData.id,
      title: movieData.title,
      rating: movieData.rating,
      poster_path: movieData.poster_path,
    }),
    [movieData],
  );

  const handleAddToFavorites = () => {
    addToFavorites(movieDataToStore);
  };

  return <button onClick={handleAddToFavorites}>Add to Favorites</button>;
}

export default AddFavoriteButton;
