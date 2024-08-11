import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import ClientProviders from '../components/ClientProviders/ClientProviders';

describe('ClientProviders Component', () => {
  it('renders children inside all providers', () => {
    render(
      <ClientProviders>
        <div>Test Content</div>
      </ClientProviders>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
