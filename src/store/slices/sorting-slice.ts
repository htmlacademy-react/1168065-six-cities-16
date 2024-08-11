import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { SORTING_CONFIG } from '@src/const';
import type { SortingConfig } from '@src/entities/sorting';
import type { State } from '@src/entities/state';

type SortingType = {
  sorting: SortingConfig;
};

const initialState = {
  sorting: SORTING_CONFIG[0],
} as SortingType;

/**
 * Слайс для работы с сортировкой
 */
export const sortingSlice = createSlice({
  name: 'sorting',
  initialState,
  reducers: {
    setActiveSorting: (state, action: PayloadAction<SortingConfig>) => {
      state.sorting = action.payload;
    },
  },
});

const { actions } = sortingSlice;
export const { setActiveSorting } = actions;

export const sortingSelector = (state: State) => state.sorting.sorting;
