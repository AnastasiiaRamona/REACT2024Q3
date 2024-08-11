import DetailsComponent from '@/components/DetailsComponent/DetailsComponent';
import SearchComponent from '@/components/SearchComponent/SearchComponent';
import apiAddress from '@/data/data';
import { CharacterResponse, SearchPageProps, Character } from '@/types';
import { GetServerSidePropsContext } from 'next';
import { ReactElement } from 'react';

const DetailsPage = ({ characterData }: CharacterResponse) => {
  return <DetailsComponent characterData={characterData} />;
};

DetailsPage.getLayout = function getLayout(page: ReactElement, pageProps: SearchPageProps) {
  return <SearchComponent outlet={page} {...pageProps} />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const pageNumber = Array.isArray(context.params?.page) ? context.params?.page[0] : context.params?.page;
  const searchTerm = Array.isArray(context.query?.searchTerm)
    ? context.query?.searchTerm[0]
    : context.query?.searchTerm;

  const page = pageNumber ? pageNumber : null;
  const currentPage = parseInt(page || '1', 10);
  const name = Array.isArray(context.params?.name) ? context.params?.name[0] : context.params?.name;

  const res = await fetch(`${apiAddress}?search=${searchTerm || ''}&page=${currentPage}`);
  const data = await res.json();

  const totalResults = data.count;
  const calculatedTotalPages = Math.ceil(totalResults / 10);

  const characterData = data.results.find((character: Character) => character.name === name);

  return {
    props: {
      data,
      page: currentPage,
      totalPages: calculatedTotalPages,
      searchTerm: searchTerm || '',
      characterData,
    },
  };
}

export default DetailsPage;
