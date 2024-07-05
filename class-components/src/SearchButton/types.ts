import { SearchResult } from '../SearchResults/types';

export interface SearchButtonState {
  searchTerm: string;
  showResults: boolean;
  results: SearchResult[] | [];
  error: string | null;
}

export interface SearchButtonProps {
  searchTerm: string;
}
