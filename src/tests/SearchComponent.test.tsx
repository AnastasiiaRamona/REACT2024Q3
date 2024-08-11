import { fireEvent, render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { expect, it, describe, Mock, vi } from 'vitest';
import SearchComponent from '../components/SearchComponent/SearchComponent';
import TestWrapper from './TestWrapper';
import { Character } from 'src/types';
import { Data } from 'src/components/SearchComponent/types';
import { useNavigation, useLocation, useNavigate, useSearchParams } from '@remix-run/react';

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

const mockName = 'Darth Vader';
const mockDetails: Character = {
  name: mockName,
  height: '1.72',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: 'test',
  films: ['test'],
  species: ['test'],
  vehicles: ['test'],
  starships: ['test'],
  created: 'test',
  edited: 'test',
  url: 'test',
};

vi.mock('@remix-run/react', async () => {
  const actual = await vi.importActual('@remix-run/react');
  return {
    ...actual,
    useNavigation: vi.fn(),
    useLocation: vi.fn(),
    useNavigate: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

const mockUseNavigation = useNavigation as Mock;
const mockUseNavigate = useNavigate as Mock;
const mockUseLocation = useLocation as Mock;
const mockUseSearchParams = useSearchParams as Mock;

global.localStorage = localStorageMock;

describe('SearchComponent', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('should save the search term to localStorage when the search button is clicked', async () => {
    const data: Data = {
      results: [
        {
          characterData: mockDetails,
        },
      ],
    };

    const mockNavigation = vi.fn();

    mockUseNavigation.mockReturnValue(mockNavigation);

    mockUseNavigate.mockReturnValue(mockNavigation);

    mockUseSearchParams.mockReturnValue([new URLSearchParams()]);

    mockUseLocation.mockReturnValue({ pathname: `` });

    await act(async () => {
      render(
        <TestWrapper>
          <MemoryRouter initialEntries={['/search/1']}>
            <Routes>
              <Route
                path="search/:page"
                element={<SearchComponent data={data} page={1} totalPages={1} searchTerm={mockName} />}
              />
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
      expect(localStorage.getItem('searchTermOfStarWarsHeroes')).toBe('Luke Skywalker');
    });
  });

  it('should load the search term from localStorage on mount', async () => {
    localStorage.setItem('searchTermOfStarWarsHeroes', mockName);

    const data: Data = {
      results: [
        {
          characterData: mockDetails,
        },
      ],
    };

    const mockNavigation = vi.fn();

    mockUseNavigation.mockReturnValue(mockNavigation);

    mockUseNavigate.mockReturnValue(mockNavigation);

    mockUseSearchParams.mockReturnValue([new URLSearchParams()]);

    mockUseLocation.mockReturnValue({ pathname: `` });

    await act(async () => {
      render(
        <TestWrapper>
          <MemoryRouter initialEntries={['/search/1']}>
            <Routes>
              <Route
                path="search/:page"
                element={<SearchComponent data={data} page={1} totalPages={1} searchTerm={mockName} />}
              />
            </Routes>
          </MemoryRouter>
        </TestWrapper>
      );
    });

    expect((screen.getByPlaceholderText('Enter search term') as HTMLInputElement).value).toBe(mockName);
  });
});
