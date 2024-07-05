export interface SearchResultsProps {
  searchTerm: string;
  results: SearchResult[] | [];
  error: string | null;
}

export interface SearchResultsState {
  filteredResults: SearchResult[];
  loading: boolean;
  error: string | null;
}

export interface SearchResult {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
}

dg