import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../../services/tmdb";

export function useMovieDetails(movieId: string | undefined) {
  return useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieDetails(movieId as string),
    enabled: Boolean(movieId),
  });
}

// export funcion useMovieCredits(movieId: number) {
//   return useQuery({
//     queryKey: ["movieCredits", movieId],
//     queryFn: () => getMovieCredits(movieId),
//   });
// }
