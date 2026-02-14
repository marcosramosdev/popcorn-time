import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../../services/tmdb";
import type { PopularMoviesResponse } from "../../services/tmdb";

export function useSearchMovies(page: number, query: string) {
  return useQuery<PopularMoviesResponse>({
    queryKey: ["movies", "search", page, query],
    queryFn: () => searchMovies(query, page),
    enabled: !!query, // A busca só será executada se houver uma query válida
  });
}
