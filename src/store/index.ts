import { configureStore } from '@reduxjs/toolkit';
import { sortingSlice } from '@src/store/slices/sorting-slice';
import { offersSlice } from '@src/store/slices/offers-slice';
import { createAPI } from '@src/services/api';

export const api = createAPI();

const store = configureStore({
  reducer: {
    [offersSlice.name]: offersSlice.reducer,
    [sortingSlice.name]: sortingSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
