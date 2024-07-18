import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorButton from '../components/ErrorButton/ErrorButton';

vi.mock('./ErrorButton.module.css', () => ({
  'error-button': 'error-button-mocked-class',
}));

describe('ErrorButton', () => {
  it('should render with initial text', () => {
    render(<ErrorButton />);

    expect(screen.getByText('Throw Error')).toBeInTheDocument();
  });

  it('should throw an error when clicked twice', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    const renderWithError = () => {
      render(<ErrorButton />);
      fireEvent.click(screen.getByText('Throw Error'));
      fireEvent.click(screen.getByText('Throw Error'));
    };

    expect(() => {
      renderWithError();
    }).toThrow('Test error to catch it');

    consoleError.mockRestore();
  });
});
