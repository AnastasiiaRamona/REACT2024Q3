import { act, fireEvent, render, screen } from '@testing-library/react';
import { ModalProvider, useModal } from '../context/ModalContext';

const TestComponent = () => {
  const { isModalOpen, selectedItemsCount, openModal, closeModal } = useModal();

  return (
    <div>
      <div data-testid="is-modal-open">{isModalOpen ? 'Open' : 'Closed'}</div>
      <div data-testid="selected-items-count">{selectedItemsCount}</div>
      <button data-testid="open-modal" onClick={() => openModal(5)}>
        Open Modal
      </button>
      <button data-testid="close-modal" onClick={closeModal}>
        Close Modal
      </button>
    </div>
  );
};

describe('ModalProvider', () => {
  it('provides the initial context values', () => {
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    expect(screen.getByTestId('is-modal-open')).toHaveTextContent('Closed');
    expect(screen.getByTestId('selected-items-count')).toHaveTextContent('0');
  });

  it('updates context values when closeModal is called', () => {
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    act(() => {
      fireEvent.click(screen.getByTestId('open-modal'));
      fireEvent.click(screen.getByTestId('close-modal'));
    });

    expect(screen.getByTestId('is-modal-open')).toHaveTextContent('Closed');
    expect(screen.getByTestId('selected-items-count')).toHaveTextContent('0');
  });
});
