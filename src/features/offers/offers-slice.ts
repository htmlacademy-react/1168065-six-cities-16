import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '@src/entities/offers';

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

export default reducer;
export const { setOffers } = actions;
