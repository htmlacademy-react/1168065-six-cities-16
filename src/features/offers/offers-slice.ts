import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  offers: [],
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setOffers: (state, action) => {
      state.offers.push(action.payload);
    },
  },
});

const { actions, reducer } = offersSlice;

export default reducer;
export const { setOffers } = actions;
