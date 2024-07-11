import React, { useEffect, useState } from 'react';
import { SearchResultsProps } from './types';
import HeroCard from '../HeroCard/HeroCard';
import styles from './SearchResults.module.css';
import lodash from 'lodash';

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const [filteredResults, setFilteredResults] = useState(results);

  useEffect(() => {
    setFilteredResults(results);
  }, [results]);

  return (
    <section className={styles['search-results']}>
      {filteredResults.map((result) => (
        <HeroCard
          key={result.name}
          id={lodash.camelCase(result.name)}
          name={result.name}
          height={result.height}
          mass={result.mass}
          hairColor={result.hair_color}
          skinColor={result.skin_color}
          eyeColor={result.eye_color}
          birthYear={result.birth_year}
          gender={result.gender}
        />
      ))}
    </section>
  );
};

export default SearchResults;
