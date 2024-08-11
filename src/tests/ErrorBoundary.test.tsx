import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import stormtrooperSrc from '../assets/501st-star-wars.gif';

export const ProblematicComponent = () => {
  throw new Error('Test error');
};

vi.mock('next/image', () => ({
  default: (props: { src: string; alt: string; width?: number; height?: number }) => <img {...props} />,
}));

describe('ErrorBoundary Component', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('renders error message and image when an error occurs', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    expect(screen.getByAltText('stormtrooper')).toBeInTheDocument();
    expect(screen.getByAltText('stormtrooper')).toHaveAttribute('src', stormtrooperSrc);

    expect(consoleError).toHaveBeenCalled();

    consoleError.mockRestore();
  });

  it('logs error to console when an error occurs', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(consoleError).toHaveBeenCalled();

    consoleError.mockRestore();
  });
});
