import { Character } from '../../components/DetailsComponent/types';
import { FoundResult } from '../../components/SearchResults/types';

export interface ApiResponse {
  results: FoundResult[];
  error: Error | null;
  count: number;
}

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
