import { combineReducers } from '@reduxjs/toolkit';
import { starWarsApi } from './apiReducer';

const rootReducer = combineReducers({
  [starWarsApi.reducerPath]: starWarsApi.reducer,
});

export default rootReducer;
