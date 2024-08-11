import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { useRouter } from 'next/router';
import HomePage from '../pages';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('HomePage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('redirects to search with searchTerm if it exists in localStorage', () => {
    const mockRouterPush = vi.fn();
    (useRouter as Mock).mockReturnValue({ push: mockRouterPush });

    localStorage.setItem('searchTermOfStarWarsHeroes', 'Luke Skywalker');

    render(<HomePage />);

    expect(mockRouterPush).toHaveBeenCalledWith('/search/1?searchTerm=Luke%20Skywalker');
  });

  it('redirects to /search/1 if searchTerm does not exist in localStorage', () => {
    const mockRouterPush = vi.fn();
    (useRouter as Mock).mockReturnValue({ push: mockRouterPush });

    render(<HomePage />);

    expect(mockRouterPush).toHaveBeenCalledWith('/search/1');
  });
});
