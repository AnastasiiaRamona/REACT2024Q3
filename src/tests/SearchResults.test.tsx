import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchResults from '../components/SearchResults/SearchResults';
import { SearchResultsProps } from '@/components/SearchResults/types';
import { JSX } from 'react';
import TestWrapper from './TestWrapper';

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    asPath: '/search?page=1',
    query: { page: '1' },
  }),
}));

vi.mock('next/image', () => ({
  default: (props: { src: string; alt: string; width?: number; height?: number }) => <img {...props} />,
}));

describe('SearchResults', () => {
  const mockResults = [
    {
      key: 'luke-skywalker',
      id: '1',
      name: 'Luke Skywalker',
      onClick: () => console.log('Luke Skywalker clicked'),
    },
    {
      key: 'darth-vader',
      id: '2',
      name: 'Darth Vader',
      onClick: () => console.log('Darth Vader clicked'),
    },
  ];

  const mockOutlet = <div>Outlet Content</div>;

  const setup = (props: JSX.IntrinsicAttributes & SearchResultsProps) => {
    render(
      <TestWrapper>
        <SearchResults {...props} />
      </TestWrapper>
    );
  };

  it('should render search results', () => {
    setup({ results: mockResults, outlet: mockOutlet, error: null });

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });

  it('should render outlet content', () => {
    setup({ results: mockResults, outlet: mockOutlet, error: null });

    expect(screen.getByText('Outlet Content')).toBeInTheDocument();
  });
});
