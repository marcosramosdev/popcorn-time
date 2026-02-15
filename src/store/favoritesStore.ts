export type FavoriteMovie = {
  id: number;
  title: string;
  poster_path: string;
  rating: number;
};

export const FAVORITES_STORAGE_KEY = "popcorn-time:favorites";
