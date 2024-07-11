import { useState, useEffect } from 'react';
import { ChangeEvent, FormEvent } from 'react';
import SearchResults from '../SearchResults/SearchResults';
import axios from 'axios';
import apiAddress from '../data/data';
import bb8Src from '../assets/bb-8.webp';
import styles from './SearchButton.module.css';

const SearchButton = () => {
  const initialSearchTerm = localStorage.getItem('searchTermOfStarWarsHeroes') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [isLoading, setIsLoading] = useState(false);
  const [areResultsShows, setAreResultsShows] = useState(true);
  const [results, setResults] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    findSearchTerm();
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setSearchTerm(input);
    localStorage.setItem('searchTermOfStarWarsHeroes', input);
  };

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    findSearchTerm();
  };

  const findSearchTerm = () => {
    getApiData(searchTerm.trim());
  };

  const getApiData = (query: string) => {
    setIsLoading(true);

    axios
      .get(`${apiAddress}?search=${query}&page=1`)
      .then((response) => {
        setResults(response.data.results);
        setAreResultsShows(true);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setAreResultsShows(false);
      })
      .finally(() => {
        setIsLoading(false);
        setAreResultsShows(true);
      });
  };

  return (
    <section>
      <form onSubmit={handleSearch} className={styles['search-form']}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Enter search term"
          className={styles['search-input']}
        />
        <button type="submit" className={styles['search-button']}>
          Search
          <img src={bb8Src} alt="search" />
        </button>
      </form>
      {isLoading && <div className={styles['loader']}></div>}
      {areResultsShows && <SearchResults results={results} error={error} />}
    </section>
  );
};

export default SearchButton;
