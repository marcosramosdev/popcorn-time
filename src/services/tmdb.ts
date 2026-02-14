const URL = "https://api.themoviedb.org/3";

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  rating: number;
};

export type Show = {
  id: number;
  name: string;
  overview: string;
  popularity: number;
};

export type PopularShowsResponse = {
  page: number;
  results: Show[];
  total_pages: number;
  total_results: number;
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

export const getPopularShows = async (page: number) => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      },
    };

    const res = await fetch(
      `${URL}/tv/popular?language=en-US&page=${page}`,
      options,
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch popular shows: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Failed to fetch popular shows:", error);
  }
};
