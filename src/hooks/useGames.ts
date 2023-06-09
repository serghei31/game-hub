import { useInfiniteQuery } from '@tanstack/react-query';
import ApiClient, { FetchResponse } from '../services/api-client';
import ms from 'ms';
import useGameQueryStore from '../store';
import { Game } from '../entities/Game';

const apiClient = new ApiClient<Game>('/games');

const useGames = () => {
  const gamequery = useGameQueryStore((s) => s.gameQuery);

  return useInfiniteQuery<FetchResponse<Game>, Error>({
    queryKey: ['games', gamequery],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          genres: gamequery.genreId,
          parent_platforms: gamequery.platformId,
          ordering: gamequery.sortOrder,
          search: gamequery.searchText,
          page: pageParam,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: ms('24h'),
  });
};

export default useGames;
