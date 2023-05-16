import { useQuery } from '@tanstack/react-query';
import { GameQuery } from '../App';
import apiClient, { FetchResponse } from '../services/api-client';

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

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
      apiClient
        .get<FetchResponse<Game>>('/games', {
          params: {
            genres: gamequery.genre?.id,
            parent_platforms: gamequery.platform?.id,
            ordering: gamequery.sortOrder,
            search: gamequery.searchText,
          },
        })
        .then((res) => res.data),
  });

export default useGames;
