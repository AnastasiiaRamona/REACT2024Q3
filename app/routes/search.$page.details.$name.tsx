import apiAddress from 'src/data/data';
import { json, useLoaderData } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/node';
import DetailsComponent from 'src/components/DetailsComponent/DetailsComponent';
import { Character, CombinedProps } from 'src/types';

export const loader: LoaderFunction = async ({ request, params }) => {
  const pageNumber = params.page || '1';
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('searchTerm') || '';
  const name = params.name || '';

  const currentPage = parseInt(pageNumber, 10);

  const res = await fetch(`${apiAddress}?search=${encodeURI(searchTerm)}&page=${currentPage}`);
  const data = await res.json();

  const totalResults = data.count;
  const calculatedTotalPages = Math.ceil(totalResults / 10);

  const characterData = data.results.find((character: Character) => character.name === name);

  return json({
    data,
    page: currentPage,
    totalPages: calculatedTotalPages,
    searchTerm,
    characterData,
  });
};

export default function DetailsPage() {
  const { characterData } = useLoaderData<CombinedProps>();
  return <DetailsComponent characterData={characterData} />;
}
