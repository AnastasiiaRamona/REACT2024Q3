'use client';

import ModalWindow from '@/components/ModalWindow/ModalWindow';
import StartPage from '@/pages/StartPage/StartPage';
import { ThemeProvider } from '@/context/ThemeContext';
import { ModalProvider } from '@/context/ModalContext';
import store from '@/store/store';
import { Provider } from 'react-redux';

export default function Home() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ModalProvider>
          <main data-testid="app-container">
            <StartPage />
            <ModalWindow />
          </main>
        </ModalProvider>
      </ThemeProvider>
    </Provider>
  );
}
