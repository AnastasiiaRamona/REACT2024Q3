import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { expect, it, describe, vi } from 'vitest';
import MissingPage from '../pages/404';
import TestWrapper from './TestWrapper';

const mockBack = vi.fn();

vi.mock('next/router', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as object;

  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock('next/image', () => ({
  default: (props: { src: string; alt: string; width?: number; height?: number }) => <img {...props} />,
}));

describe('MissingPage', () => {
  it('should render 404 message and image', () => {
    render(
      <TestWrapper>
        <MemoryRouter>
          <MissingPage />
        </MemoryRouter>
      </TestWrapper>
    );

    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
    expect(screen.getByAltText('c3po')).toBeInTheDocument();
    expect(screen.getByText('This is not the page you are looking for')).toBeInTheDocument();
  });

  it('should call router.back when "Back" button is clicked', () => {
    render(
      <TestWrapper>
        <MissingPage />
      </TestWrapper>
    );

    fireEvent.click(screen.getByText('Back'));

    expect(mockBack).toHaveBeenCalled();
  });
});
