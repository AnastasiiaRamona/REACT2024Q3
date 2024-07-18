import React from 'react';
import ReactDOM from 'react-dom/client';
import StartPage from './pages/StartPage/StartPage';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
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
