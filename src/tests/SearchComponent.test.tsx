import { fireEvent, render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { expect, it, describe, vi, Mock } from 'vitest';
import SearchComponent from '../components/SearchComponent/SearchComponent';
import TestWrapper from './TestWrapper';
import { useGetHeroesQuery } from '../store/reducers/apiReducer';

vi.mock('../store/reducers/apiReducer', async (importOriginal) => {
  const actual = (await importOriginal()) as { useGetCharacterDetailsQuery: Mock };
  return {
    ...actual,
    useGetHeroesQuery: vi.fn(),
  };
});

const mockUseGetHeroesQuery = useGetHeroesQuery as unknown as Mock;

const store: Record<string, string> = {};
const localStorageMock: Storage = {
  getItem: (key: string) => store[key] || null,
  key: (index: number) => Object.keys(store)[index] || null,
  setItem: (key: string, value: string) => {
    store[key] = value;
  },
  removeItem: (key: string) => {
    delete store[key];
  },
  clear: () => {
    for (const key in store) {
      if (Object.prototype.hasOwnProperty.call(store, key)) {
        delete store[key];
      }
    }
  },
  get length() {
    return Object.keys(store).length;
  },
};

global.localStorage = localStorageMock;

describe('SearchComponent', () => {
  beforeEach(() => {
    localStorageMock.clear();
    mockUseGetHeroesQuery.mockReset();
  });

  it('should display "No results found" message when there are no results', async () => {
    mockUseGetHeroesQuery.mockReturnValue({
      data: { results: [], count: 0 },
      isFetching: false,
      error: null,
    });

    await act(async () => {
      render(
        <TestWrapper>
          <MemoryRouter initialEntries={['/search/1']}>
            <Routes>
              <Route path="search/:page" element={<SearchComponent />} />
            </Routes>
          </MemoryRouter>
        </TestWrapper>
      );
    });

    fireEvent.change(screen.getByPlaceholderText('Enter search term'), {
      target: { value: 'test' },
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Search'));
    });

    await waitFor(() => {
      expect(screen.getByText('No Results Found. Please try again')).toBeInTheDocument();
    });
  });

  it('should save the search term to localStorage when the search button is clicked', async () => {
    mockUseGetHeroesQuery.mockReturnValue({
      data: { results: [], count: 0 },
      isFetching: false,
      error: null,
    });

    await act(async () => {
      render(
        <TestWrapper>
          <MemoryRouter initialEntries={['/search/1']}>
            <Routes>
              <Route path="search/:page" element={<SearchComponent />} />
            </Routes>
          </MemoryRouter>
        </TestWrapper>
      );
    });

    fireEvent.change(screen.getByPlaceholderText('Enter search term'), {
      target: { value: 'Luke Skywalker' },
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Search'));
    });

    await waitFor(() => {
      expect(localStorage.getItem('searchTermOfStarWarsHeroes')).toBe('"Luke Skywalker"');
    });
  });

  it('should load the search term from localStorage on mount', async () => {
    localStorage.setItem('searchTermOfStarWarsHeroes', '"Darth Vader"');

    mockUseGetHeroesQuery.mockReturnValue({
      data: { results: [], count: 0 },
      isFetching: false,
      error: null,
    });

    await act(async () => {
      render(
        <TestWrapper>
          <MemoryRouter initialEntries={['/search/1']}>
            <Routes>
              <Route path="search/:page" element={<SearchComponent />} />
            </Routes>
          </MemoryRouter>
        </TestWrapper>
      );
    });

    expect((screen.getByPlaceholderText('Enter search term') as HTMLInputElement).value).toBe('Darth Vader');
  });
});
