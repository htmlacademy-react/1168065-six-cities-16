import { createSlice } from '@reduxjs/toolkit';
import type { State } from '@src/entities/state';
import { Offer } from '@src/entities/offers';
import { changeFavorite, fetchFavorites } from '../thunks/favorites';

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
    builder
      // загрузка избранного
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      // обработка изменения isFavorite
      .addCase(changeFavorite.fulfilled, (state, action) => {
        // запишем добавленный в стейт
        if (action.payload.isFavorite) {
          state.favorites.push(action.payload);
        } else {
          // уберем убранный из стейта
          state.favorites = state.favorites.filter(
            (item) => item.id !== action.payload.id
          );
        }
      });
  },
});

/**
 * Избранное
 */
export const getFavorites = (state: State): Offer[] =>
  state.favorites.favorites;
