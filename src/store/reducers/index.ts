import { combineReducers } from '@reduxjs/toolkit';
import { starWarsApi } from './apiReducer';
import loaderReducer from './loaderSlice';
import checkedItemsReducer from './checkedItemsSlice';
import detailsReducer from './detailsSlice';

const rootReducer = combineReducers({
  [starWarsApi.reducerPath]: starWarsApi.reducer,
  loader: loaderReducer,
  checkedItems: checkedItemsReducer,
  details: detailsReducer,
});

export default rootReducer;
