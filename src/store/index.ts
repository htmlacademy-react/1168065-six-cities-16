import { configureStore } from '@reduxjs/toolkit';
import { sortingSlice } from '@src/store/slices/sorting-slice';
import { offersSlice } from '@src/store/slices/offers-slice';

const store = configureStore({
  reducer: {
    [offersSlice.name]: offersSlice.reducer,
    [sortingSlice.name]: sortingSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
