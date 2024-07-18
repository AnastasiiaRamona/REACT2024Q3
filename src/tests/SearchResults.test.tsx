import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SearchResults from '../components/SearchResults/SearchResults';
import { expect, it, describe, vi } from 'vitest';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockNavigate = vi.fn();

describe('SearchResults', () => {
  const mockResults = [
    { name: 'Card 1', key: 'card1', id: '1', onClick: vi.fn() },
    { name: 'Card 2', key: 'card2', id: '2', onClick: vi.fn() },
  ];

  it('should render the specified number of cards', () => {
    render(
      <MemoryRouter initialEntries={['/search/1']}>
        <Routes>
          <Route path="search/:page" element={<SearchResults results={mockResults} error={null} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('hero-card')).toHaveLength(mockResults.length);
  });

  it('should navigate to the detail view when a card is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/search/1']}>
        <Routes>
          <Route path="search/:page" element={<SearchResults results={mockResults} error={null} />} />
          <Route path="search/:page/details/:name" element={<div>Details</div>} />
        </Routes>
      </MemoryRouter>
    );

    const cards = screen.getAllByTestId('hero-card');
    expect(cards).toHaveLength(mockResults.length);

    fireEvent.click(cards[0]);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/search/1/details/Card 1');
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
