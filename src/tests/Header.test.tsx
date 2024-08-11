'use client';

import { render } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import Header from '../components/Header/Header';
import TestWrapper from './TestWrapper';
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

describe('Header Component', () => {
  it('should render the title with dark theme styles', () => {
    (useTheme as Mock).mockReturnValue({
      theme: 'dark',
      setTheme: vi.fn(),
    });

    const { container } = render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    const title = container.querySelector('span');
    expect(title).toBeInTheDocument();

    const titleClassName = title?.className || '';

    expect(titleClassName).toMatch(/_title_\w+/);
    expect(titleClassName).toMatch(/_dark_\w+/);
  });

  it('should render the title with light theme styles', () => {
    (useTheme as Mock).mockReturnValue({
      theme: 'light',
      setTheme: vi.fn(),
    });

    const { container } = render(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    const title = container.querySelector('span');
    expect(title).toBeInTheDocument();

    const titleClassName = title?.className || '';

    expect(titleClassName).toMatch(/_title_\w+/);
    expect(titleClassName).toMatch(/_light_\w+/);
  });
});
