import React, { createContext, useContext, useState } from 'react';
import { ModalContextType, ModalProviderProps } from './types';

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemsCount, setSelectedItemsCount] = useState(0);

  const openModal = (count: number) => {
    setSelectedItemsCount(count);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItemsCount(0);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, selectedItemsCount }}>
      {children}
    </ModalContext.Provider>
  );
};
