import { configureStore } from '@reduxjs/toolkit';
import offers from '@src/features/offers/offers-slice';
import sorting from '@src/features/sorting/sorting-slice';

const store = configureStore({
  reducer: { offers, sorting },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
