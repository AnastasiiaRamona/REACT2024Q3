import { describe, it, expect, Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFoundPage, { loader } from '~/routes/$';
import { useNavigate } from '@remix-run/react';
import TestWrapper from './TestWrapper';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

vi.mock('@remix-run/react', () => ({
  useNavigate: vi.fn(),
}));

const mockUseNavigate = useNavigate as Mock;

describe('NotFoundPage', () => {
  it('renders MissingPage component', () => {
    const mockNavigate = vi.fn();
    mockUseNavigate.mockReturnValue(mockNavigate);
    render(
      <TestWrapper>
        <MemoryRouter initialEntries={['']}>
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MemoryRouter>
      </TestWrapper>
    );
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });

  it('should return a response', async () => {
    const response = await loader({
      request: new Request('http://app.com/ffsadf'),
      params: {},
      context: {},
    });

    expect(response).toBeInstanceOf(Response);
  });
});
