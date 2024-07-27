import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Pagination from '../components/Pagination/Pagination';

import * as ReactRouterDom from 'react-router-dom';
import TestWrapper from './TestWrapper';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as object;

  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('Pagination', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(ReactRouterDom.useNavigate).mockReturnValue(mockNavigate);
    vi.clearAllMocks();
  });

  it('renders correctly with currentPage and totalPages', () => {
    render(
      <TestWrapper>
        <MemoryRouter>
          <Pagination currentPage={2} totalPages={5} />
        </MemoryRouter>
      </TestWrapper>
    );

    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
  });

  it('calls navigate with correct URL when clicking "Previous" button', () => {
    render(
      <TestWrapper>
        <MemoryRouter>
          <Pagination currentPage={2} totalPages={5} />
        </MemoryRouter>
      </TestWrapper>
    );

    const previousButton = screen.getByText('Previous');
    fireEvent.click(previousButton);

    expect(mockNavigate).toHaveBeenCalledWith('/search/1');
  });

  it('calls navigate with correct URL when clicking "Next" button', () => {
    render(
      <TestWrapper>
        <MemoryRouter>
          <Pagination currentPage={2} totalPages={5} />
        </MemoryRouter>
      </TestWrapper>
    );

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(mockNavigate).toHaveBeenCalledWith('/search/3');
  });

  it('disables "Previous" button when on the first page', () => {
    render(
      <TestWrapper>
        <MemoryRouter>
          <Pagination currentPage={1} totalPages={5} />
        </MemoryRouter>
      </TestWrapper>
    );

    const previousButton = screen.getByText('Previous');
    expect(previousButton).toBeDisabled();
  });

  it('disables "Next" button when on the last page', () => {
    render(
      <TestWrapper>
        <MemoryRouter>
          <Pagination currentPage={5} totalPages={5} />
        </MemoryRouter>
      </TestWrapper>
    );

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });
});
