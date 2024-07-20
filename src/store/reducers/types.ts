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
