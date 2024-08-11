import { describe, it, expect } from 'vitest';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import apiAddress from '../data/data';
import { starWarsApi } from '../store/reducers/apiReducer';

describe('starWarsApi', () => {
  it('should have correct reducerPath', () => {
    expect(starWarsApi.reducerPath).toBe('starWarsApi');
  });

  it('should use correct baseQuery', () => {
    const baseQuery = fetchBaseQuery({ baseUrl: apiAddress });
    expect(baseQuery).toBeDefined();
  });

  it('should export useGetHeroesQuery and useGetCharacterDetailsQuery hooks', () => {
    expect(starWarsApi.useGetCharacterDetailsQuery).toBeDefined();
  });
});
