import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchComponent from '../components/SearchComponent/SearchComponent';
import TestWrapper from './TestWrapper';
import { SearchComponentProps } from '../components/SearchComponent/types';
import { JSX } from 'react';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams('page=1'),
}));

vi.mock('next/image', () => ({
  default: (props: { src: string; alt: string; width?: number; height?: number }) => <img {...props} />,
}));

describe('SearchComponent', () => {
  const setup = (props: JSX.IntrinsicAttributes & SearchComponentProps) => {
    render(
      <TestWrapper>
        <SearchComponent {...props} />
      </TestWrapper>
    );
  };

  it('should render correctly', () => {
    setup({
      data: {
        results: [],
        error: null,
        count: 0,
      },
      page: 1,
      totalPages: 1,
      searchTerm: '',
    });

    expect(screen.getByPlaceholderText('Enter search term')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
  });
});
