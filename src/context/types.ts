import { ReactNode } from 'react';

export interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export interface ModalContextType {
  isModalVisible: boolean;
  showModal: () => void;
  hideModal: () => void;
}

export interface ModalProviderProps {
  children: ReactNode;
}
