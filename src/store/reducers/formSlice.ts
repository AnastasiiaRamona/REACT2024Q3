import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormState } from './types';

const initialState: FormState = {
  name: '',
  age: 0,
  email: '',
  password: '',
  country: '',
  file: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setFormData } = formSlice.actions;
export default formSlice.reducer;
