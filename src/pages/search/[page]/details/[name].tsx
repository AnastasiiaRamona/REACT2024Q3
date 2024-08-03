import DetailsComponent from '@/components/DetailsComponent/DetailsComponent';
import SearchComponent from '@/components/SearchComponent/SearchComponent';
import { ReactElement } from 'react';
// import { ReactElement } from 'react';

const DetailsPage = () => {
  return <DetailsComponent />;
};

DetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <SearchComponent outlet={page} />;
};

export default DetailsPage;
