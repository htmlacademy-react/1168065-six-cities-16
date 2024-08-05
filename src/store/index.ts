import { configureStore } from '@reduxjs/toolkit';
import offers from '@src/features/offers/offers-slice';

const store = configureStore({
  reducer: { offers },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
