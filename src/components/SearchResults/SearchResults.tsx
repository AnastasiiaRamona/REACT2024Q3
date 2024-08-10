import { useEffect, useState } from 'react';
import { SearchResultsProps } from './types';
import HeroCard from '../HeroCard/HeroCard';
import styles from './SearchResults.module.css';
import lodash from 'lodash';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Outlet, useSearchParams } from '@remix-run/react';

import { useDispatch } from 'react-redux';

const SearchResults = ({ results }: SearchResultsProps) => {
  const dispatch = useDispatch();
  const [filteredResults, setFilteredResults] = useState(results);
  const { page } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('searchTerm') || '';
  const currentPage = parseInt(page || '1', 10);

  useEffect(() => {
    setFilteredResults(results);
  }, [results, currentPage, dispatch]);

  const handleCardClick = (event: React.MouseEvent, name: string) => {
    event.stopPropagation();

    const currentUrl = location.pathname;
    const newDetailsPath = `/details/${encodeURI(name)}`;

    const cleanedUrl = currentUrl.replace(/\/details\/[^/?]*/, '');

    let newUrl;
    if (searchTerm) {
      newUrl = `${cleanedUrl}${newDetailsPath}?searchTerm=${encodeURI(searchTerm)}`;
    } else {
      newUrl = `${cleanedUrl}${newDetailsPath}`;
    }

    navigate(newUrl);
  };

  const handleSearchResultsClick = () => {
    const currentUrl = location.pathname;
    const params = new URLSearchParams(window.location.search);

    const newUrl = currentUrl.replace(/\/details\/[^/?]*/, '');

    const searchParams = params.toString() ? `?${params.toString()}` : '';

    navigate(`${newUrl}${searchParams}`);
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
      <div className={styles['details-container']}>
        <Outlet />
      </div>
    </div>
  );
};

export default SearchResults;
