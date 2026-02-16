import type { FavoriteMovie } from "../../../store/favoritesStore";
import { tmdbImageUrl, POSTER_DIMENSIONS } from "../../../services/tmdb";
import LazyImage from "@/components/LazyImage";
import { Button } from "@/components/ui/button";

type Props = {
  movie: FavoriteMovie;
  onRemove: (movieId: number) => void;
};

function FavoriteCard({ movie, onRemove }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
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

      {/* Info */}
      <div className="p-3 space-y-2">
        <h3 className="truncate text-sm font-medium text-card-foreground">
          {movie.title}
        </h3>
        {movie.rating > 0 && (
          <p className="text-xs text-muted-foreground">
            Rating: {movie.rating.toFixed(1)}
          </p>
        )}
        <Button
          variant="destructive"
          size="xs"
          className="w-full"
          onClick={() => onRemove(movie.id)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}

export default FavoriteCard;
