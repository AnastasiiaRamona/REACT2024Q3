import { ReactNode } from 'react';

export interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export interface ModalProviderProps {
  children: ReactNode;
}

export interface ModalContextType {
  isModalOpen: boolean;
  selectedItemsCount: number;
  openModal: (count: number) => void;
  closeModal: () => void;
}
