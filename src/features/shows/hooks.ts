import { useInfiniteQuery } from "@tanstack/react-query";
import { getPopularShows } from "../../services/tmdb";

export function usePopularShows() {
  const query = useInfiniteQuery({
    queryKey: ["popularShows", "shows"],
    queryFn: ({ pageParam }) => getPopularShows(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 1000 * 60 * 5,
  });

  const shows = query.data?.pages.flatMap((page) => page.results) ?? [];

  const { error, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    query;

  return {
    shows,
    error,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
}
