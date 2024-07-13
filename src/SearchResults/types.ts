export interface SearchResultsProps {
  results: FoundResult[];
  error: string | null;
}
export interface SearchResultsState {
  loading: boolean;
  filteredResults: FoundResult[];
}

export interface FoundResult {
  key: string;
  id: string;
  name: string;
  onClick: () => void;
}
