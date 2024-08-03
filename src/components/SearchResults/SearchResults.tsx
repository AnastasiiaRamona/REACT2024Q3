'use client';

import { useEffect, useState } from 'react';
import { SearchResultsProps } from './types';
import HeroCard from '../HeroCard/HeroCard';
import styles from './SearchResults.module.css';
import lodash from 'lodash';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setResults } from '../../store/reducers/searchSlice';

const SearchResults = ({ results, outlet }: SearchResultsProps) => {
  const dispatch = useDispatch();
  const [filteredResults, setFilteredResults] = useState(results);

  const router = useRouter();
  const pageNumber = Array.isArray(router.query.page) ? router.query.page[0] : router.query.page;

  const page = pageNumber ? pageNumber : null;
  const currentPage = parseInt((page as string) || '1', 10);

  useEffect(() => {
    setFilteredResults(results);
    dispatch(setResults({ results, page: currentPage }));
  }, [results, currentPage, dispatch]);

  const handleCardClick = (event: React.MouseEvent, name: string) => {
    event.stopPropagation();
    router.push(`/search/${currentPage}/details/${name}`, undefined, { shallow: true });
  };

  const handleSearchResultsClick = () => {
    if (router.asPath.includes(`/details/`)) {
      router.push(`/search/${currentPage}`, undefined, { shallow: true });
    }
  };

  return (
    <div className={styles['container']} onClick={handleSearchResultsClick}>
      <section className={styles['search-results']}>
        {filteredResults.map((result) => (
          <HeroCard
            key={result.name}
            id={lodash.camelCase(result.name)}
            name={result.name}
            onClick={(event) => handleCardClick(event, result.name)}
          />
        ))}
      </section>
      <div className={styles['details-container']}>{outlet}</div>
    </div>
  );
};

export default SearchResults;
