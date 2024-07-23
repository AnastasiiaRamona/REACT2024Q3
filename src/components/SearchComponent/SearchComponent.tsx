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
import { hideLoader, showLoader } from '../../store/reducers/loaderSlice';
import { useAppDispatch, useAppSelector } from './hooks';
import Button from '../Button/Button';
import { useTheme } from '../../context/ThemeContext';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTermOfStarWarsHeroes', '');
  const [totalPages, setTotalPages] = useState<number | undefined>();
  const { page } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(parseInt(page || '1', 10));
  const [isValidPage, setIsValidPage] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchTerm || '');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading } = useAppSelector((state) => state.loader);

  const { data, isFetching, error } = useGetHeroesQuery({ query: searchQuery, page: currentPage });

  const { theme } = useTheme();

  useEffect(() => {
    if (isFetching) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isFetching, dispatch]);

  useEffect(() => {
    if (data) {
      const totalResults = data.count;
      const calculatedTotalPages = Math.ceil(totalResults / 10);
      setTotalPages(calculatedTotalPages);
    }
  }, [data]);

  useEffect(() => {
    const pageNumber = parseInt(page || '1', 10);
    if (isNaN(pageNumber) || pageNumber < 1) {
      setIsValidPage(false);
    } else {
      setIsValidPage(true);
      setCurrentPage(pageNumber);
    }
  }, [page, totalPages]);

  useEffect(() => {
    if (!isFetching && error) {
      setIsValidPage(false);
    }
  }, [isFetching, error]);

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
          className={`${styles['search-input']} ${styles[theme]}`}
        />
        <Button
          text={'Search'}
          className={styles['search-button']}
          type={'submit'}
          img={bb8Src}
          alt={'search'}
        ></Button>
      </form>
      {isLoading && <div className={`${styles.loader} ${styles[theme]}`}></div>}
      {data?.results && data.results.length > 0 && <SearchResults results={data.results} error={null} />}
      {!isLoading && data?.results && data.results.length === 0 && <NotFoundResults />}
      {data?.results && currentPage && totalPages && totalPages > 1 && (
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
