import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormState } from './types';

const initialState: FormState[] = [];

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormState>) => {
      state.push(action.payload);
    },
  },
});

export const { addFormData } = formSlice.actions;
export default formSlice.reducer;
