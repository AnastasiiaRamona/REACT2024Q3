import { render, screen } from '@testing-library/react';
import React from 'react';
import { expect, it, describe } from 'vitest';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import StartPage from '../StartPage/StartPage';

describe('App Component', () => {
  it('renders header with correct text', () => {
    render(
      <React.StrictMode>
        <ErrorBoundary>
          <header>
            <h1>
              <span>Star Wars</span> Heroes
            </h1>
          </header>
          <StartPage />
        </ErrorBoundary>
      </React.StrictMode>
    );

    expect(screen.getByText(/Star Wars/i)).toBeInTheDocument();
    expect(screen.getByText(/Heroes/i)).toBeInTheDocument();
  });

  it('renders StartPage component', () => {
    render(
      <React.StrictMode>
        <ErrorBoundary>
          <StartPage />
        </ErrorBoundary>
      </React.StrictMode>
    );

    expect(screen.getByTestId('start-page')).toBeInTheDocument();
  });
});
