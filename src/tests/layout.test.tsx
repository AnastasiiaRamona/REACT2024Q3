import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Layout from '~/layout';
import TestWrapper from './TestWrapper';

describe('Layout component', () => {
  it('renders children', () => {
    render(
      <TestWrapper>
        <Layout>Test children</Layout>
      </TestWrapper>
    );
    expect(screen.getByText('Test children')).toBeInTheDocument();
  });

  it('renders Header component', () => {
    render(
      <TestWrapper>
        <Layout>Test children</Layout>
      </TestWrapper>
    );
    expect(screen.getByTestId('header-component')).toBeInTheDocument();
  });

  it('renders ThemeChanging component', () => {
    render(
      <TestWrapper>
        <Layout>Test children</Layout>
      </TestWrapper>
    );
    expect(screen.getByTestId('theme-changing')).toBeInTheDocument();
  });

  it('renders Footer component', () => {
    render(
      <TestWrapper>
        <Layout>Test children</Layout>
      </TestWrapper>
    );
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('applies theme class to container', () => {
    const theme = 'dark';
    render(
      <TestWrapper>
        <Layout>Test children</Layout>
      </TestWrapper>
    );
    expect(screen.getByTestId('layout-container')).toHaveClass(`container ${theme}`);
  });
});
