import { combineReducers } from '@reduxjs/toolkit';
import paginationReducer from './paginationSlice';

const rootReducer = combineReducers({
  pagination: paginationReducer,
});

export default rootReducer;
