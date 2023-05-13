import useData from './useData';
import genres from '../data/genres';

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

const useGenres = () => ({ data: genres, isLoading: false, error: null }); // Genre list is probably never updated, so rather then calling the API every time I decided to load it statically

//const useGenres = () => useData<Genre>('/genres');

export default useGenres;
