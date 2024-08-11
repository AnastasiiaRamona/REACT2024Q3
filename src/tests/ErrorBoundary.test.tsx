import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';

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
    const ProblematicComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    expect(screen.getByAltText('stormtrooper')).toBeInTheDocument();
  });

  it('logs error to console when an error occurs', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    const ProblematicComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(consoleError).toHaveBeenCalled();
    consoleError.mockRestore();
  });
});
