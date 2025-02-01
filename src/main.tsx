import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import { ModalProvider } from './context/ModalContext';
import { Provider } from 'react-redux';
import store from './store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <ModalProvider>
          <App></App>
        </ModalProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
