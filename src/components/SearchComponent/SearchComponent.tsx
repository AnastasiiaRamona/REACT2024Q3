import { FormEvent, useEffect } from 'react';
import SearchResults from '../SearchResults/SearchResults';
import bb8Src from '../../assets/bb-8.webp';
import styles from './SearchComponent.module.css';
import Pagination from '../Pagination/Pagination';
import NotFoundResults from '../NotFoundResults/NotFoundResults';
import Button from '../Button/Button';
import { useTheme } from '../../context/ThemeContext';
import { SearchComponentProps } from './types';
import { useLocation, useNavigate } from '@remix-run/react';

const SearchComponent = ({ data, page, totalPages, searchTerm }: SearchComponentProps) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchTerm = location.search;

    if (isNaN(page) || page < 1 || page > totalPages) {
      navigate(`/search/1${searchTerm}`);
    }
  }, [page, totalPages]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const searchInput = (event.target as HTMLFormElement).elements.namedItem('searchTerm') as HTMLInputElement;
    const searchTerm = searchInput.value.trim();

    const newUrl = searchTerm === '' ? '/search/1' : `/search/1?searchTerm=${encodeURI(searchTerm)}`;
    navigate(newUrl);
  };

  return (
    <section className={styles['search-section']}>
      <form method="get" className={styles['search-form']} id="search-form" onSubmit={handleSubmit}>
        <input
          id="search-input"
          type="text"
          name="searchTerm"
          defaultValue={searchTerm}
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
      {data?.results && data.results.length > 0 && <SearchResults results={data.results} error={null} />}
      {data?.results && data.results.length === 0 && <NotFoundResults />}
      {data?.results && page && totalPages && totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} searchTerm={searchTerm} />
      )}
    </section>
  );
};

export default SearchComponent;
