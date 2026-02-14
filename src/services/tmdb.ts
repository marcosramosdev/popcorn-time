const URL = "https://api.themoviedb.org/3";

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  rating: number;
};

export type PopularMoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export const getPopularMovies = async (
  page: number,
): Promise<PopularMoviesResponse> => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  const res = await fetch(
    `${URL}/movie/popular?language=en-US&page=${page}`,
    options,
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch popular movies: ${res.status}`);
  }

  return res.json();
};
