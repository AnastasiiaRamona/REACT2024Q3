import { combineReducers } from '@reduxjs/toolkit';
import countriesReducer from './countriesSlice';

const rootReducer = combineReducers({
  countries: countriesReducer,
});

export default rootReducer;
