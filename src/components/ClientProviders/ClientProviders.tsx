'use client';

import { ModalProvider } from '@/context/ModalContext';
import { ThemeProvider } from '@/context/ThemeContext';
import store from '@/store/store';
import { Provider } from 'react-redux';

const ClientProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ModalProvider>{children}</ModalProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default ClientProviders;
