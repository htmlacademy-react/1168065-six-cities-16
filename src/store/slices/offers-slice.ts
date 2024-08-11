import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Offer } from '@src/entities/offers';
import type { State } from '@src/entities/state';

type OffersState = {
  offers: Offer[];
};

const initialState = {
  offers: [],
} as OffersState;

/**
 * Слайс для работы с предложениями
 */
export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
  },
});

const { actions } = offersSlice;
export const { setOffers } = actions;

export const offersSelector = (state: State) => state.offers.offers;
