import { useState, useEffect } from 'react';
import { ChangeEvent, FormEvent } from 'react';
import SearchResults from '../SearchResults/SearchResults';
import bb8Src from '../../assets/bb-8.webp';
import styles from './SearchComponent.module.css';
import Pagination from '../Pagination/Pagination';
import { useNavigate, useParams } from 'react-router-dom';
import MissingPage from '../../pages/MissingPage/MissingPage';
import NotFoundResults from '../NotFoundResults/NotFoundResults';
import { useGetHeroesQuery } from '../../store/reducers/apiReducer';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTermOfStarWarsHeroes', '');
  const [totalPages, setTotalPages] = useState(0);
  const { page } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(parseInt(page || '1', 10));
  const [isValidPage, setIsValidPage] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchTerm || '');

  const navigate = useNavigate();

  const { data, isFetching } = useGetHeroesQuery({ query: searchQuery, page: currentPage });
  console.log(isFetching);

  useEffect(() => {
    const pageNumber = parseInt(page || '1', 10);
    if (isNaN(pageNumber) || pageNumber < 1) {
      setIsValidPage(false);
      return;
    }
    setCurrentPage(pageNumber);
  }, [page]);

  useEffect(() => {
    if (data) {
      const totalResults = data.count;
      const calculatedTotalPages = Math.ceil(totalResults / 10);
      setTotalPages(calculatedTotalPages);
    }
  }, [data]);

  useEffect(() => {
    if (!isValidPage || (currentPage > totalPages && totalPages > 0)) {
      return;
    }
  }, [searchQuery, currentPage, totalPages, isValidPage]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setSearchTerm(input);
  };

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCurrentPage(1);
    setSearchQuery(searchTerm.trim());
    navigate(`/search/1`);
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
      {isFetching && <div className={styles['loader']}></div>}
      {data?.results && data.results.length > 0 && <SearchResults results={data.results} error={null} />}
      {!isFetching && data?.results && data.results.length === 0 && <NotFoundResults />}
      {data?.results && currentPage && totalPages > 1 && (
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
