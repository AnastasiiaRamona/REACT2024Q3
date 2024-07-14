import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { expect, it, describe, vi, Mock } from 'vitest';
import axios from 'axios';
import SearchComponent from '../SearchComponent/SearchComponent';

vi.mock('axios');
const mockedAxios = axios as unknown as { get: Mock };
mockedAxios.get = vi.fn().mockResolvedValue({
  data: { results: [], count: 0 },
});

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
  });

  it('should display "No results found" message when there are no results', async () => {
    render(
      <MemoryRouter initialEntries={['/search/1']}>
        <Routes>
          <Route path="search/:page" element={<SearchComponent />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter search term'), {
      target: { value: 'test' },
    });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(screen.getByText('No Results Found. Please try again')).toBeInTheDocument();
    });
  });

  it('should save the search term to localStorage when the search button is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/search/1']}>
        <Routes>
          <Route path="search/:page" element={<SearchComponent />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter search term'), {
      target: { value: 'Luke Skywalker' },
    });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(localStorage.getItem('searchTermOfStarWarsHeroes')).toBe('"Luke Skywalker"');
    });
  });

  it('should load the search term from localStorage on mount', () => {
    localStorage.setItem('searchTermOfStarWarsHeroes', '"Darth Vader"');

    render(
      <MemoryRouter initialEntries={['/search/1']}>
        <Routes>
          <Route path="search/:page" element={<SearchComponent />} />
        </Routes>
      </MemoryRouter>
    );

    expect((screen.getByPlaceholderText('Enter search term') as HTMLInputElement).value).toBe('Darth Vader');
  });
});
