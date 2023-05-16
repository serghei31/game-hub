import { useQuery } from '@tanstack/react-query';
import { GameQuery } from '../App';
import ApiClient, { FetchResponse } from '../services/api-client';
import { Platform } from './usePlatforms';

const apiClient = new ApiClient<Game>('/games');

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}

const useGames = (gamequery: GameQuery) =>
  useQuery<FetchResponse<Game>, Error>({
    queryKey: ['games', gamequery],
    queryFn: () =>
      apiClient.getAll({
        params: {
          genres: gamequery.genre?.id,
          parent_platforms: gamequery.platform?.id,
          ordering: gamequery.sortOrder,
          search: gamequery.searchText,
        },
      }),
  });

export default useGames;
