import { render, screen } from '@testing-library/react';
import SearchResults from '../SearchResults/SearchResults';
import { expect, it, describe, vi } from 'vitest';

describe('SearchResults', () => {
  const mockResults = [
    { name: 'Card 1', key: 'card1', id: '1', onClick: vi.fn() },
    { name: 'Card 2', key: 'card2', id: '2', onClick: vi.fn() },
  ];

  it('should render the specified number of cards', () => {
    render(<SearchResults results={mockResults} error={null} />);

    expect(screen.getAllByRole('button')).toHaveLength(mockResults.length);
  });

  it('should display a message when no cards are present', () => {
    render(<SearchResults results={[]} error={null} />);

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });
});
