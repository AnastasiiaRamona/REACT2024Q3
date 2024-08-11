import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import MissingPage from '../app/not-found';
import TestWrapper from './TestWrapper';

const mockBack = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

vi.mock('next/image', () => ({
  default: (props: { src: string; alt: string; width?: number; height?: number }) => <img {...props} />,
}));

describe('MissingPage', () => {
  it('should render 404 message and image', () => {
    render(
      <TestWrapper>
        <MissingPage />
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
