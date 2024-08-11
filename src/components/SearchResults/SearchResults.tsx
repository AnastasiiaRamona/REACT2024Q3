'use client';

import { useEffect, useState } from 'react';
import { SearchResultsProps } from './types';
import HeroCard from '../HeroCard/HeroCard';
import styles from './SearchResults.module.css';
import lodash from 'lodash';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

const SearchResults = ({ results, outlet }: SearchResultsProps) => {
  const dispatch = useDispatch();
  const [filteredResults, setFilteredResults] = useState(results);

  const router = useRouter();
  const pageNumber = Array.isArray(router.query.page) ? router.query.page[0] : router.query.page;

  const page = pageNumber ? pageNumber : null;
  const currentPage = parseInt((page as string) || '1', 10);

  useEffect(() => {
    setFilteredResults(results);
  }, [results, currentPage, dispatch]);

  const handleCardClick = (event: React.MouseEvent, name: string) => {
    event.stopPropagation();

    const currentUrl = router.asPath;

    const detailsNameRegExp = /\/details\/[^?]*/;

    const hasSearchTerm = currentUrl.includes('searchTerm=');

    const newDetailsPath = `/details/${encodeURIComponent(name)}`;

    let newUrl;

    if (detailsNameRegExp.test(currentUrl)) {
      newUrl = currentUrl.replace(detailsNameRegExp, newDetailsPath);
    } else {
      if (hasSearchTerm) {
        newUrl = currentUrl.replace(/(\?.*)/, `${newDetailsPath}$1`);
      } else {
        newUrl = `${currentUrl}${newDetailsPath}`;
      }
    }

    router.push(newUrl);
  };

  const handleSearchResultsClick = () => {
    const currentUrl = router.asPath;

    const newUrl = currentUrl.replace(/\/details\/[^/?]*/, '').replace(/(\?.*)/, '$1');

    router.push(newUrl);
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
