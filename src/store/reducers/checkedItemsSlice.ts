import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CheckedItemsState } from './types';
import { Character } from '../../components/DetailsComponent/types';

const initialState: CheckedItemsState = {
  items: [],
  checkedStatus: {},
};

const checkedItemsSlice = createSlice({
  name: 'checkedItems',
  initialState,
  reducers: {
    addCharacter(state, action: PayloadAction<Character>) {
      const character = action.payload;
      if (!state.items.some((item) => item.name === character.name)) {
        state.items.push(character);
        state.checkedStatus[character.name] = true;
      }
    },
    removeCharacter(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.name !== action.payload);
      delete state.checkedStatus[action.payload];
    },
    clearCharacters(state) {
      state.items = [];
      state.checkedStatus = {};
    },
    setCheckedStatus(state, action: PayloadAction<{ name: string; isChecked: boolean }>) {
      state.checkedStatus[action.payload.name] = action.payload.isChecked;
    },
  },
});

export const { addCharacter, removeCharacter, clearCharacters, setCheckedStatus } = checkedItemsSlice.actions;

export default checkedItemsSlice.reducer;
