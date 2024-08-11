import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Main from '../app/main';

vi.mock('@/components/ClientProviders/ClientProviders', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('@/components/ErrorBoundary/ErrorBoundary', () => ({
  __esModule: true,
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('Main Component', () => {
  it('should render ErrorBoundary and ClientProviders with children', () => {
    const testContent = 'Test Content';

    render(
      <Main>
        <div>{testContent}</div>
      </Main>
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('should render child components correctly', () => {
    const childContent = 'Child Component';

    render(
      <Main>
        <span>{childContent}</span>
      </Main>
    );

    expect(screen.getByText(childContent)).toBeInTheDocument();
  });
});
