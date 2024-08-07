import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { State } from '@src/entities/state';

type SortingOptions = 'popular' | 'price-lth' | 'price-htl' | 'rating-htl';

type SortingType = {
  sorting: SortingOptions;
};

const initialState = {
  sorting: 'popular',
} as SortingType;

const sortingSlice = createSlice({
  name: 'sorting',
  initialState,
  reducers: {
    setActiveSorting: (state, action: PayloadAction<SortingOptions>) => {
      state.sorting = action.payload;
    },
  },
});

const { actions, reducer } = sortingSlice;

export const sortingSelector = (state: State) => state.sorting;
export const { setActiveSorting } = actions;
export default reducer;
