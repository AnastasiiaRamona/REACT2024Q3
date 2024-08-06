import SearchComponent from '@/components/SearchComponent/SearchComponent';
import apiAddress from '@/data/data';
import { GetServerSidePropsContext } from 'next';
import { SearchPageProps } from './types';

const SearchPage = ({ data, page, totalPages, searchTerm }: SearchPageProps) => {
  return <SearchComponent data={data} page={page} totalPages={totalPages} searchTerm={searchTerm} />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const pageNumber = Array.isArray(context.params?.page) ? context.params?.page[0] : context.params?.page;
  const searchTerm = Array.isArray(context.query?.searchTerm)
    ? context.query?.searchTerm[0]
    : context.query?.searchTerm;

  const page = pageNumber ? pageNumber : null;

  const currentPage = parseInt(page || '1');

  const res = await fetch(`${apiAddress}?search=${searchTerm || ''}&page=${currentPage}`);
  const data = await res.json();

  const totalResults = data.count;
  const calculatedTotalPages = Math.ceil(totalResults / 10);

  return {
    props: {
      data,
      page: currentPage,
      totalPages: calculatedTotalPages,
      searchTerm: searchTerm || '',
    },
  };
}

export default SearchPage;
