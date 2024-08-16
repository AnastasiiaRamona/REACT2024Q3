import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Country from './types';

export const fetchCountries = createAsyncThunk<string[]>('countries/fetchCountries', async () => {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const data = await response.json();
  return data.map((country: Country) => country.name.common);
});

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    countries: [] as string[],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default countriesSlice.reducer;
