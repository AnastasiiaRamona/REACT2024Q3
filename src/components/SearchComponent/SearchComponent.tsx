'use client';

import { useEffect } from 'react';
import { FormEvent } from 'react';
import SearchResults from '../SearchResults/SearchResults';
import bb8Src from '../../assets/bb-8.webp';
import styles from './SearchComponent.module.css';
import Pagination from '../Pagination/Pagination';
import NotFoundResults from '../NotFoundResults/NotFoundResults';
import Button from '../Button/Button';
import { useTheme } from '../../context/ThemeContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchComponentProps } from './types';

const SearchComponent = ({ outlet, data, page, totalPages, searchTerm }: SearchComponentProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { theme } = useTheme();

  useEffect(() => {
    const hasSearchTerm = searchParams.has('searchTerm');

    if (!hasSearchTerm && (isNaN(page) || page < 1 || page > totalPages)) {
      router.push('/search/1');
    }
  }, [page, totalPages, router, searchParams]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchInput = event.target as HTMLFormElement;
    const searchTerm = (searchInput.elements[0] as HTMLInputElement).value.trim();
    localStorage.setItem('searchTermOfStarWarsHeroes', searchTerm);

    const newUrl = `/search/1${searchTerm === '' ? '' : `?searchTerm=${encodeURIComponent(searchTerm)}`}`;

    router.push(newUrl);
  };

  return (
    <section className={styles['search-section']}>
      <form onSubmit={handleSearch} className={styles['search-form']} id="search-form">
        <input
          id="search-input"
          type="text"
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
      {data?.results && data.results.length > 0 && (
        <SearchResults results={data.results} error={null} outlet={outlet} />
      )}
      {data?.results && data.results.length === 0 && <NotFoundResults />}
      {data?.results && page && totalPages && totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} searchTerm={searchTerm} />
      )}
    </section>
  );
};

export default SearchComponent;
