import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import apiAddress from '../../data/data';
import { CharacterResults } from './types';

export const starWarsApi = createApi({
  reducerPath: 'starWarsApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiAddress }),
  endpoints: (builder) => ({
    getCharacterDetails: builder.query<CharacterResults, string>({
      query: (name) => `?search=${name}`,
    }),
  }),
});

export const { useGetCharacterDetailsQuery } = starWarsApi;
