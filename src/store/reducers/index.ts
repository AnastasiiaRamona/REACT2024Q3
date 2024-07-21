import { combineReducers } from '@reduxjs/toolkit';
import { starWarsApi } from './apiReducer';
import loaderReducer from './loaderSlice';

const rootReducer = combineReducers({
  [starWarsApi.reducerPath]: starWarsApi.reducer,
  loader: loaderReducer,
});

export default rootReducer;
