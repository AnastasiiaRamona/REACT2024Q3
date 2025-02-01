import { describe, it, expect, vi } from 'vitest';
import { setupListeners } from '@reduxjs/toolkit/query';
import store from '../store/store';

vi.mock('@reduxjs/toolkit/query', () => ({
  setupListeners: vi.fn(),
}));

describe('Redux Store Configuration', () => {
  it('should call setupListeners with store.dispatch', () => {
    expect(setupListeners).toHaveBeenCalledWith(store.dispatch);
  });
});
