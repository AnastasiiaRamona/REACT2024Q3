import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import { ModalProvider } from './context/ModalContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ModalProvider>
        <App></App>
      </ModalProvider>
    </ThemeProvider>
  </React.StrictMode>
);
