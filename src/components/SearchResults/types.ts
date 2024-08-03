import { ReactElement } from 'react';

export interface SearchResultsProps {
  results: FoundResult[];
  error: string | null;
  outlet?: ReactElement;
}
export interface SearchResultsState {
  loading: boolean;
  filteredResults: FoundResult[];
}

export interface FoundResult {
  key: string;
  id: string;
  name: string;
  onClick: (event: MouseEvent) => void;
}
