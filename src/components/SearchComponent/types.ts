import { DetailsPageProps } from 'src/types';

export type SearchComponentProps = {
  data: Data;
  page: number;
  totalPages: number;
  searchTerm: string;
};

export interface Data {
  results: DetailsPageProps[];
}
