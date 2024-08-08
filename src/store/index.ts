import { configureStore } from '@reduxjs/toolkit';
import offers from '@src/store/slices/offers-slice';
import sorting from '@src/store/slices/sorting-slice';

const store = configureStore({
  reducer: { offers, sorting },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
