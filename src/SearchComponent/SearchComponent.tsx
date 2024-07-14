import { useState, useEffect } from 'react';
import { ChangeEvent, FormEvent } from 'react';
import SearchResults from '../SearchResults/SearchResults';
import axios from 'axios';
import apiAddress from '../data/data';
import bb8Src from '../assets/bb-8.webp';
import styles from './SearchComponent.module.css';
import Pagination from '../Pagination/Pagination';
import { useNavigate, useParams } from 'react-router-dom';
import MissingPage from '../MissingPage/MissingPage';
import NotFoundResults from '../NotFoundResults/NotFoundResults';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTermOfStarWarsHeroes', '');
  const [isLoading, setIsLoading] = useState(false);
  const [areResultsShows, setAreResultsShows] = useState(true);
  const [results, setResults] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const { page } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(parseInt(page || '1', 10));
  const [isValidPage, setIsValidPage] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const pageNumber = parseInt(page || '1', 10);
    if (isNaN(pageNumber) || pageNumber < 1) {
      setIsValidPage(false);
      return;
    }
    setCurrentPage(pageNumber);
  }, [page]);

  useEffect(() => {
    if (!isValidPage || (currentPage > totalPages && totalPages > 0)) {
      return;
    }
    getApiData(searchTerm.trim(), currentPage);
  }, [currentPage, totalPages, isValidPage]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setSearchTerm(input);
  };

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCurrentPage(1);
    getApiData(searchTerm.trim(), 1);
    navigate(`/search/1`);
  };

  const getApiData = (query: string, page?: number) => {
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
        setIsValidPage(true);
      })
      .catch((error) => {
        setError(error.message);
        setAreResultsShows(false);
        setIsValidPage(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!isValidPage) {
    return <MissingPage />;
  }

  return (
    <section className={styles['search-section']}>
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
      {!isLoading && results && results.length === 0 && <NotFoundResults />}
      {currentPage && areResultsShows && results.length > 0 && totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
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
