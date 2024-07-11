import { useState, useEffect } from 'react';
import { ChangeEvent, FormEvent } from 'react';
import SearchResults from '../SearchResults/SearchResults';
import axios from 'axios';
import apiAddress from '../data/data';
import bb8Src from '../assets/bb-8.webp';
import styles from './SearchButton.module.css';

const SearchButton = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTermOfStarWarsHeroes', '');
  const [isLoading, setIsLoading] = useState(false);
  const [areResultsShows, setAreResultsShows] = useState(true);
  const [results, setResults] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getApiData(searchTerm.trim());
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setSearchTerm(input);
  };

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

const useLocalStorage = (key: string, initialValue: string) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    try {
      return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error(`Error parsing stored value for key ${key}:`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
