import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '~/app';

describe('App component', () => {
  it('renders children', () => {
    render(<App>Test children</App>);
    expect(screen.getByText('Test children')).toBeInTheDocument();
  });
});
