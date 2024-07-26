import { combineReducers } from '@reduxjs/toolkit';
import { starWarsApi } from './apiReducer';
import loaderReducer from './loaderSlice';
import searchReducer from './searchSlice';
import checkedItemsReducer from './checkedItemsSlice';

const rootReducer = combineReducers({
  [starWarsApi.reducerPath]: starWarsApi.reducer,
  loader: loaderReducer,
  search: searchReducer,
  checkedItems: checkedItemsReducer,
});

export default rootReducer;
