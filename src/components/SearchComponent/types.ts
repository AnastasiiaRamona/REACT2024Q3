import { ApiResponse } from '@/store/reducers/types';
import { ReactElement } from 'react';

export type SearchComponentProps = {
  data: ApiResponse;
  page: number;
  totalPages: number;
  searchTerm: string;
  outlet?: ReactElement;
};
