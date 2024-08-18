import { combineReducers } from '@reduxjs/toolkit';
import countriesReducer from './countriesSlice';
import formReducer from './formSlice';

const rootReducer = combineReducers({
  countries: countriesReducer,
  form: formReducer,
});

export default rootReducer;
