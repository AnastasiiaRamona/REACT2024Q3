import { render, screen } from '@testing-library/react';
import React from 'react';
import { expect, it, describe } from 'vitest';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../context/ThemeContext';
import { ModalProvider } from '../context/ModalContext';
import store from '../store/store';
import App from '../App';

describe('App Component', () => {
  it('renders Header component', () => {
    render(
      <React.StrictMode>
        <Provider store={store}>
          <ThemeProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </ThemeProvider>
        </Provider>
      </React.StrictMode>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders Footer component', () => {
    render(
      <React.StrictMode>
        <Provider store={store}>
          <ThemeProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </ThemeProvider>
        </Provider>
      </React.StrictMode>
    );

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders StartPage component', () => {
    render(
      <React.StrictMode>
        <Provider store={store}>
          <ThemeProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </ThemeProvider>
        </Provider>
      </React.StrictMode>
    );

    expect(screen.getByTestId('start-page')).toBeInTheDocument();
  });

  it('applies the correct theme class', () => {
    const mockTheme = 'dark';

    render(
      <React.StrictMode>
        <Provider store={store}>
          <ThemeProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </ThemeProvider>
        </Provider>
      </React.StrictMode>
    );

    expect(screen.getByTestId('app-container')).toHaveClass(mockTheme);
  });
});
