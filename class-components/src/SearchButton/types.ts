import { FoundResult } from '../SearchResults/types';

export interface SearchButtonState {
  searchTerm: string;
  areResultsShows: boolean;
  results: FoundResult[] | [];
  error: string | null;
}

export interface SearchButtonProps {
  searchTerm: string;
}
