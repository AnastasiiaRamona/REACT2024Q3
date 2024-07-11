import { useState, useEffect } from 'react';
import { ChangeEvent, FormEvent } from 'react';
import SearchResults from '../SearchResults/SearchResults';
import axios from 'axios';
import apiAddress from '../data/data';
import bb8Src from '../assets/bb-8.webp';
import styles from './SearchComponent.module.css';
import Pagination from '../Pagination/Pagination';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTermOfStarWarsHeroes', '');
  const [isLoading, setIsLoading] = useState(false);
  const [areResultsShows, setAreResultsShows] = useState(true);
  const [results, setResults] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    console.log(`Current Page: ${currentPage}`);
    getApiData(searchTerm.trim(), currentPage);
  }, [currentPage]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setSearchTerm(input);
  };

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCurrentPage(1);
    getApiData(searchTerm.trim(), 1);
  };

  const handlePageChange = (pageNumber: number) => {
    console.log(`Page Change Requested: ${pageNumber}`);
    setCurrentPage(pageNumber);
  };

  const getApiData = (query: string, page: number) => {
    setIsLoading(true);

    axios
      .get(`${apiAddress}?search=${query}&page=${page}`)
      .then((response) => {
        setResults(response.data.results);
        const totalResults = response.data.count;
        const calculatedTotalPages = Math.ceil(totalResults / 10);
        setTotalPages(calculatedTotalPages);
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
      {areResultsShows && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </section>
  );
};

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

export default SearchComponent;
