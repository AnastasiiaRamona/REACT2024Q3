export interface SearchResultsProps {
  results: FoundResult[];
  error: string | null;
}
export interface SearchResultsState {
  loading: boolean;
  filteredResults: FoundResult[];
}

export interface FoundResult {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}
