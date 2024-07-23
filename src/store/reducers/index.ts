import { combineReducers } from '@reduxjs/toolkit';
import { starWarsApi } from './apiReducer';
import loaderReducer from './loaderSlice';
import searchReducer from './searchSlice';

const rootReducer = combineReducers({
  [starWarsApi.reducerPath]: starWarsApi.reducer,
  loader: loaderReducer,
  search: searchReducer,
});

export default rootReducer;
