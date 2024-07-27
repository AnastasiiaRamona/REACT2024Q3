import { configureStore, Store } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { setupListeners } from '@reduxjs/toolkit/query';
import { starWarsApi } from './reducers/apiReducer';

const store: Store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(starWarsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
