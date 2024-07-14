import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { expect, it, describe, vi } from 'vitest';
import MissingPage from '../MissingPage/MissingPage';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as object;

  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('MissingPage', () => {
  it('should render 404 message and image', () => {
    render(
      <MemoryRouter>
        <MissingPage />
      </MemoryRouter>
    );

    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
    expect(screen.getByAltText('c3po')).toBeInTheDocument();
    expect(screen.getByText('This is not the page you are looking for')).toBeInTheDocument();
  });

  it('should call navigate with -1 when "Back" button is clicked', () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <MissingPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Back'));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
