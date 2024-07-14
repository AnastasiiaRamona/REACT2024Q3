import { useEffect, useState } from 'react';
import { SearchResultsProps } from './types';
import HeroCard from '../HeroCard/HeroCard';
import styles from './SearchResults.module.css';
import lodash from 'lodash';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

const SearchResults = ({ results }: SearchResultsProps) => {
  const [filteredResults, setFilteredResults] = useState(results);
  const { page } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = parseInt(page || '1', 10);

  useEffect(() => {
    setFilteredResults(results);
  }, [results]);

  const handleCardClick = (event: React.MouseEvent, name: string) => {
    event.stopPropagation();
    navigate(`/search/${currentPage}/details/${name}`);
  };

  const handleSearchResultsClick = () => {
    if (location.pathname.includes(`/details/`)) {
      navigate(`/search/${currentPage}`);
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
      <div className={styles['details-container']}>
        <Outlet />
      </div>
    </div>
  );
};

export default SearchResults;
