import { render, screen } from '@testing-library/react';
import React from 'react';
import { expect, it, describe } from 'vitest';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import StartPage from '../pages/StartPage/StartPage';
import { Provider } from 'react-redux';
import { ModalProvider } from '../context/ModalContext';
import { ThemeProvider } from '../context/ThemeContext';
import store from '../store/store';

describe('Main Component', () => {
  it('renders StartPage component', () => {
    render(
      <React.StrictMode>
        <Provider store={store}>
          <ThemeProvider>
            <ModalProvider>
              <ErrorBoundary>
                <StartPage />
              </ErrorBoundary>
            </ModalProvider>
          </ThemeProvider>
        </Provider>
      </React.StrictMode>
    );

    expect(screen.getByTestId('start-page')).toBeInTheDocument();
  });
});
