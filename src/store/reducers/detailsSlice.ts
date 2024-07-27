import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharacterResults, DetailsState } from './types';

const initialState: DetailsState = {
  character: null,
};

const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    setCharacterDetails(state, action: PayloadAction<CharacterResults>) {
      state.character = action.payload;
    },
    clearCharacterDetails(state) {
      state.character = null;
    },
  },
});

export const { setCharacterDetails, clearCharacterDetails } = detailsSlice.actions;

export default detailsSlice.reducer;
