import apiAddress from '@/data/data';
import SearchComponent from '@/components/SearchComponent/SearchComponent';
import { SearchPageProps } from '@/types';

const SearchPage = async ({
  searchParams,
  params,
}: {
  searchParams: { searchTerm?: string };
  params: { page: string };
}) => {
  const pageNumber = params.page;
  const searchTerm = searchParams.searchTerm || '';

  const currentPage = parseInt(pageNumber || '1');

  const res = await fetch(`${apiAddress}?search=${searchTerm || ''}&page=${currentPage}`);
  const data = await res.json();

  const totalResults = data.count;
  const calculatedTotalPages = Math.ceil(totalResults / 10);

  const props: SearchPageProps = {
    data,
    page: currentPage,
    totalPages: calculatedTotalPages,
    searchTerm,
  };

  return <SearchComponent {...props} />;
};

export default SearchPage;
