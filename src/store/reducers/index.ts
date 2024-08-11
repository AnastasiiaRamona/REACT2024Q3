import { combineReducers } from '@reduxjs/toolkit';
import { starWarsApi } from './apiReducer';
import checkedItemsReducer from './checkedItemsSlice';
import detailsReducer from './detailsSlice';

const rootReducer = combineReducers({
  [starWarsApi.reducerPath]: starWarsApi.reducer,
  checkedItems: checkedItemsReducer,
  details: detailsReducer,
});

export default rootReducer;
