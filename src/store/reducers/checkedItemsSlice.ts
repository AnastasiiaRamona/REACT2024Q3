import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CheckedItemsState } from './types';
import { Character } from '../../components/DetailsComponent/types';

const initialState: CheckedItemsState = {
  items: [],
};

const checkedItemsSlice = createSlice({
  name: 'checkedItems',
  initialState,
  reducers: {
    addCharacter(state, action: PayloadAction<Character>) {
      const character = action.payload;
      if (!state.items.some((item) => item.name === character.name)) {
        state.items.push(character);
      }
    },
    removeCharacter(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },
    clearCharacters(state) {
      state.items = [];
    },
  },
});

export const { addCharacter, removeCharacter, clearCharacters } = checkedItemsSlice.actions;

export default checkedItemsSlice.reducer;
