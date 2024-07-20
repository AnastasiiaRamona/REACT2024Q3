import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import apiAddress from '../../data/data';
import { ApiResponse, CharacterResults } from './types';

export const starWarsApi = createApi({
  reducerPath: 'starWarsApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiAddress }),
  endpoints: (builder) => ({
    getHeroes: builder.query<ApiResponse, { query: string; page?: number }>({
      query: ({ query, page }) => {
        const pageParam = page ? `&page=${page}` : '';
        return `?search=${query}${pageParam}`;
      },
    }),
    getCharacterDetails: builder.query<CharacterResults, string>({
      query: (name) => `?search=${name}`,
    }),
  }),
});

export const { useGetHeroesQuery, useGetCharacterDetailsQuery } = starWarsApi;
