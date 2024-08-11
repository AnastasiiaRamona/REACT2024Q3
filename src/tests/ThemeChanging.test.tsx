import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ThemeChanging from '../components/ThemeChanging/ThemeChanging';
import * as ThemeContext from '../context/ThemeContext';

const mockSetTheme = vi.fn();

describe('ThemeChanging Component', () => {
  beforeEach(() => {
    vi.spyOn(ThemeContext, 'useTheme').mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
    });
  });

  it('renders correctly', () => {
    render(<ThemeChanging />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('checks the checkbox if the theme is dark', () => {
    vi.spyOn(ThemeContext, 'useTheme').mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
    });

    render(<ThemeChanging />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('calls setTheme with "dark" when checkbox is unchecked and clicked', () => {
    render(<ThemeChanging />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('calls setTheme with "light" when checkbox is checked and clicked', () => {
    vi.spyOn(ThemeContext, 'useTheme').mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
    });

    render(<ThemeChanging />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });
});
