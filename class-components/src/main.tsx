import React from 'react';
import ReactDOM from 'react-dom/client';
import { StartPage } from './StartPage/StartPage';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <header>
      <h1>Star Wars Heroes</h1>
    </header>
    <StartPage />
  </React.StrictMode>
);
