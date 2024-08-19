import { createSlice } from '@reduxjs/toolkit';
import type { State } from '@src/entities/state';
import { Offer } from '@src/entities/offers';
import { fetchFavorites } from '../thunks/favorites';

type FavoritesState = {
  favorites: Offer[];
};

const initialState = {
  favorites: [],
} as FavoritesState;

/**
 * Слайс для работы с предложениями
 */
export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload;
    });
  },
});

/**
 * Избранное
 */
export const getFavorites = (state: State): Offer[] =>
  state.favorites.favorites;
