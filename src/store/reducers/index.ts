import { combineReducers } from '@reduxjs/toolkit';
import { starWarsApi } from './apiReducer';
import loaderReducer from './loaderSlice';
import searchReducer from './searchSlice';
import checkedItemsReducer from './checkedItemsSlice';
import detailsReducer from './detailsSlice';

const rootReducer = combineReducers({
  [starWarsApi.reducerPath]: starWarsApi.reducer,
  loader: loaderReducer,
  search: searchReducer,
  checkedItems: checkedItemsReducer,
  details: detailsReducer,
});

export default rootReducer;
