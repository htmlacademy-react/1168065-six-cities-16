import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Offer } from '@src/entities/offers';
import type { State } from '@src/entities/state';

type OffersState = {
  offers: Offer[];
};

const initialState = {
  offers: [],
} as OffersState;

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
  },
});

const { actions, reducer } = offersSlice;

export const offersSelector = (state: State) => state.offers.offers;
export const { setOffers } = actions;
export default reducer;
