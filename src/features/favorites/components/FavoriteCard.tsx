import type { FavoriteMovie } from "../../../store/favoritesStore";

type Props = {
  movie: FavoriteMovie;
  onRemove: (movieId: number) => void;
};

function FavoriteCard({ movie, onRemove }: Props) {
  return (
    <li>
      <div>
        {movie.id} - {movie.title} - {movie.rating} - {movie.poster_path}
      </div>
      <div>
        <button onClick={() => onRemove(movie.id)}>Remove Favorite</button>
      </div>
    </li>
  );
}

export default FavoriteCard;
