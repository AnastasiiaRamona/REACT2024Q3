'use client';

import { useEffect, useState } from 'react';
import { SearchResultsProps } from './types';
import HeroCard from '../HeroCard/HeroCard';
import styles from './SearchResults.module.css';
import lodash from 'lodash';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';

const SearchResults = ({ results, outlet }: SearchResultsProps) => {
  const dispatch = useDispatch();
  const [filteredResults, setFilteredResults] = useState(results);

  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const pageNumber = params.get('page');

  const page = pageNumber ? pageNumber : null;
  const currentPage = parseInt((page as string) || '1', 10);
  const searchTerm = params.get('searchTerm');

  useEffect(() => {
    setFilteredResults(results);
  }, [results, currentPage, dispatch]);

  const handleCardClick = (event: React.MouseEvent, name: string) => {
    event.stopPropagation();

    const currentUrl = pathname;
    const newDetailsPath = `/details/${encodeURIComponent(name)}`;

    const cleanedUrl = currentUrl.replace(/\/details\/[^/?]*/, '');

    let newUrl;
    if (searchTerm) {
      newUrl = `${cleanedUrl}${newDetailsPath}?searchTerm=${encodeURIComponent(searchTerm)}`;
    } else {
      newUrl = `${cleanedUrl}${newDetailsPath}`;
    }

    router.push(newUrl);
  };

  const handleSearchResultsClick = () => {
    const currentUrl = pathname;
    const params = new URLSearchParams(window.location.search);

    const newUrl = currentUrl.replace(/\/details\/[^/?]*/, '');

    const searchParams = params.toString() ? `?${params.toString()}` : '';

    router.push(`${newUrl}${searchParams}`);
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
