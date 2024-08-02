'use client';

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import Footer from '../components/Footer/Footer';
import TestWrapper from './TestWrapper';
import darthVaderSrc from '../assets/darth-vader.webp';
import jediSrc from '../assets/jedi.webp';
import { useTheme } from '../context/ThemeContext';

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

describe('Footer Component', () => {
  it('should render the correct image for dark theme', () => {
    (useTheme as Mock).mockReturnValue({
      theme: 'dark',
      setTheme: vi.fn(),
    });

    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    );

    const img = screen.getByAltText('star wars picture');
    expect(img).toHaveAttribute('src', darthVaderSrc);
  });

  it('should render the correct image for light theme', () => {
    (useTheme as Mock).mockReturnValue({
      theme: 'light',
      setTheme: vi.fn(),
    });

    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    );

    const img = screen.getByAltText('star wars picture');
    expect(img).toHaveAttribute('src', jediSrc);
  });

  it('should render the GitHub link with correct attributes', () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    );

    const link = screen.getByText('Anastasiia Ramona');
    expect(link).toHaveAttribute('href', 'https://github.com/AnastasiiaRamona');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should display the correct year', () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    );

    expect(screen.getByText('2024')).toBeInTheDocument();
  });
});
