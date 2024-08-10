import apiAddress from '@/data/data';
import DetailsComponent from '@/components/DetailsComponent/DetailsComponent';
import SearchComponent from '@/components/SearchComponent/SearchComponent';
import { Character, SearchPageProps, CharacterResponse } from '@/types';

const DetailsPage = async ({
  searchParams,
  params,
}: {
  searchParams: { searchTerm?: string };
  params: { page: string; name: string };
}) => {
  const pageNumber = params.page;
  const searchTerm = searchParams.searchTerm || '';
  const name = decodeURI(params.name);

  const currentPage = parseInt(pageNumber || '1');

  const res = await fetch(`${apiAddress}?search=${searchTerm || ''}&page=${currentPage}`);
  const data = await res.json();

  const totalResults = data.count;
  const calculatedTotalPages = Math.ceil(totalResults / 10);

  const characterData = data.results.find((character: Character) => character.name === name);

  const props: SearchPageProps & CharacterResponse = {
    data,
    page: currentPage,
    totalPages: calculatedTotalPages,
    searchTerm,
    characterData,
  };

  return <SearchComponent outlet={<DetailsComponent characterData={characterData} />} {...props} />;
};

export default DetailsPage;
