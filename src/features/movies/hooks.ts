import { useInfiniteQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../../services/tmdb";

export function usePopularMovies() {
  const query = useInfiniteQuery({
    queryKey: ["movies", "popular"],
    queryFn: ({ pageParam }) => getPopularMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 5,
  });

  const movies = query.data?.pages.flatMap((page) => page.results) ?? [];

  return {
    movies,
    error: query.error,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
  };
}
