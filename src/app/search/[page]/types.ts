import { ApiResponse } from '@/store/reducers/types';

export interface SearchPageProps {
  data: ApiResponse;
  page: number;
  totalPages: number;
  searchTerm: string;
}
