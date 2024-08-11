'use client';

import { render, screen, fireEvent } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import ModalWindow from '../components/ModalWindow/ModalWindow';
import TestWrapper from './TestWrapper';
import { clearCharacters } from '../store/reducers/checkedItemsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../context/ThemeContext';

vi.mock('next/image', () => ({
  default: (props: { src: string; alt: string; width?: number; height?: number }) => <img {...props} />,
}));

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useSelector: vi.fn(),
    useDispatch: vi.fn(),
  };
});

const closeModalMock = vi.fn();
vi.mock('../context/ModalContext', async (importOriginal) => {
  const actual = await importOriginal();
  if (typeof actual === 'object' && actual !== null) {
    return {
      ...actual,
      useModal: () => ({
        isModalOpen: true,
        selectedItemsCount: 1,
        closeModal: closeModalMock,
      }),
    };
  } else {
    throw new Error('Actual is not an object');
  }
});

vi.mock('../context/ThemeContext', async (importOriginal) => {
  const actual = await importOriginal();
  if (typeof actual === 'object' && actual !== null) {
    return {
      ...actual,
      useTheme: vi.fn(),
    };
  } else {
    throw new Error('Actual is not an object');
  }
});

describe('ModalWindow', () => {
  let dispatchMock: Mock<(...args: unknown[]) => unknown>;

  beforeEach(() => {
    dispatchMock = vi.fn();
    (useDispatch as unknown as Mock).mockReturnValue(dispatchMock);
    (useSelector as unknown as Mock).mockImplementation((selector) =>
      selector({
        checkedItems: {
          items: [
            {
              name: 'Luke Skywalker',
              height: '172',
              mass: '77',
              hair_color: 'blond',
              skin_color: 'fair',
              eye_color: 'blue',
              birth_year: '19BBY',
              gender: 'male',
            },
          ],
        },
      })
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the correct image based on the theme', () => {
    (useTheme as Mock).mockReturnValue({
      theme: 'light',
      setTheme: vi.fn(),
    });

    render(
      <TestWrapper>
        <ModalWindow />
      </TestWrapper>
    );

    expect(screen.getByAltText('star wars picture')).toHaveAttribute(
      'src',
      expect.stringContaining('mandalorian-baby-yoda.webp')
    );
  });

  it('handles the Unselect all button click', () => {
    render(
      <TestWrapper>
        <ModalWindow />
      </TestWrapper>
    );

    fireEvent.click(screen.getByText('Unselect all'));

    expect(dispatchMock).toHaveBeenCalledWith(clearCharacters());
    expect(closeModalMock).toHaveBeenCalledTimes(1);
  });
});
