import SearchComponent from 'src/components/SearchComponent/SearchComponent';
import apiAddress from 'src/data/data';
import { SearchPageProps } from '../../src/types';
import { json, useLoaderData } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async ({ request, params }) => {
  const pageNumber = params.page || '1';
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('searchTerm') || '';

  const currentPage = parseInt(pageNumber, 10);

  const res = await fetch(`${apiAddress}?search=${encodeURI(searchTerm)}&page=${currentPage}`);
  const data = await res.json();

  const totalResults = data.count;
  const calculatedTotalPages = Math.ceil(totalResults / 10);

  return json({
    data,
    page: currentPage,
    totalPages: calculatedTotalPages,
    searchTerm,
  });
};

export default function SearchPage() {
  const { data, page, totalPages, searchTerm } = useLoaderData<SearchPageProps>();

  return <SearchComponent data={data} page={page} totalPages={totalPages} searchTerm={searchTerm} />;
}
