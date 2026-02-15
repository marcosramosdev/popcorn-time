const URL = "https://api.themoviedb.org/3";

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  rating: number;
  overview: string;
  popularity: number;
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

export type MovieGenre = {
  id: number;
  name: string;
};

export type ProductionCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type MovieDetailsResponse = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null;
  budget: number;
  genres: MovieGenre[];
  homepage: string;
  id: number;
  imdb_id: string | null;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
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

export async function searchMovies(
  query: string,
  page: number,
): Promise<PopularMoviesResponse> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  const res = await fetch(
    `${URL}/search/movie?query=${encodeURIComponent(
      query,
    )}&language=en-US&page=${page}`,
    options,
  );

  if (!res.ok) {
    throw new Error(`Failed to search movies: ${res.status}`);
  }

  return res.json();
}

export async function getMovieDetails(
  movieId: string,
): Promise<MovieDetailsResponse> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  const response = await fetch(
    `${URL}/movie/${movieId}?language=en-US`,
    options,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch movie details: ${response.status}`);
  }

  return response.json();
}
