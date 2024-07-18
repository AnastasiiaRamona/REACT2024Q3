import { configureStore, Store } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store: Store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
