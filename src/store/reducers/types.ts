import { Character } from '../../components/DetailsComponent/types';
import { FoundResult } from '../../components/SearchResults/types';

export interface SearchState {
  searchTerm: string;
  currentPage: number;
  isValidPage: boolean;
}

export interface CharacterResults {
  results: Character[];
}

export interface LoaderState {
  isLoading: boolean;
}

export interface SearchResults {
  results: FoundResult[];
  currentPage: number;
}

export interface CheckedItemsState {
  items: Character[];
  checkedStatus: { [name: string]: boolean };
}

export interface DetailsState {
  character: CharacterResults | null;
}
