import { createContext, useContext, useState } from 'react';
import { ModalContextType, ModalProviderProps } from './types';

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  return <ModalContext.Provider value={{ isModalVisible, showModal, hideModal }}>{children}</ModalContext.Provider>;
};
