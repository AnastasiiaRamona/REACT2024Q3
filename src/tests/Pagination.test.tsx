import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from '../components/Pagination/Pagination';
import TestWrapper from './TestWrapper';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Pagination', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with currentPage and totalPages', () => {
    render(
      <TestWrapper>
        <Pagination currentPage={2} totalPages={5} searchTerm="" />
      </TestWrapper>
    );

    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
  });

  it('calls push with correct URL when clicking "Previous" button', () => {
    render(
      <TestWrapper>
        <Pagination currentPage={2} totalPages={5} searchTerm="" />
      </TestWrapper>
    );

    const previousButton = screen.getByText('Previous');
    fireEvent.click(previousButton);

    expect(mockPush).toHaveBeenCalledWith('/search/1');
  });

  it('calls push with correct URL when clicking "Next" button', () => {
    render(
      <TestWrapper>
        <Pagination currentPage={2} totalPages={5} searchTerm="" />
      </TestWrapper>
    );

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(mockPush).toHaveBeenCalledWith('/search/3');
  });

  it('disables "Previous" button when on the first page', () => {
    render(
      <TestWrapper>
        <Pagination currentPage={1} totalPages={5} searchTerm="" />
      </TestWrapper>
    );

    const previousButton = screen.getByText('Previous');
    expect(previousButton).toBeDisabled();
  });

  it('disables "Next" button when on the last page', () => {
    render(
      <TestWrapper>
        <Pagination currentPage={5} totalPages={5} searchTerm="" />
      </TestWrapper>
    );

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });
});
