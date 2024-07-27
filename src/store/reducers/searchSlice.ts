import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchResults } from './types';
import { FoundResult } from '../../components/SearchResults/types';

const initialState: SearchResults = {
  results: [],
  currentPage: 1,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setResults(state, action: PayloadAction<{ results: FoundResult[]; page: number }>) {
      state.results = action.payload.results;
      state.currentPage = action.payload.page;
    },
  },
});

export const { setResults } = searchSlice.actions;
export default searchSlice.reducer;
