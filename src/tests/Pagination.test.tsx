import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Pagination from 'src/components/Pagination/Pagination';
import TestWrapper from './TestWrapper';

describe('Pagination', () => {
  it('renders correctly with currentPage and totalPages', () => {
    render(
      <TestWrapper>
        <MemoryRouter>
          <Pagination searchTerm={''} currentPage={2} totalPages={5} />
        </MemoryRouter>
      </TestWrapper>
    );

    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
  });
});
