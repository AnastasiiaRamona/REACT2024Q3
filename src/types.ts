import { Data } from './components/SearchComponent/types';

export interface SearchPageProps {
  data: Data;
  page: number;
  totalPages: number;
  searchTerm: string;
}
export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface DetailsPageProps {
  characterData: Character;
}

export type CombinedProps = SearchPageProps & DetailsPageProps;
