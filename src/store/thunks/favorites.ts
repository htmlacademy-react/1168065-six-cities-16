import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '@src/const';
import type { ThunksAPI } from '@src/entities/state';
import { Offer } from '@src/entities/offers';
import { FavoriteValue } from '../../const';

type ChangeFavoriteArgs = {
  id: string;
  status: FavoriteValue;
};

/**
 * Загрузка избранного
 */
export const fetchFavorites = createAsyncThunk<Offer[], undefined, ThunksAPI>(
  'favorites/fetchFavorites',
  async (_args, { extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Favorite);
    return data;
  }
);

/**
 * Смена статуса избранного
 */
export const changeFavorite = createAsyncThunk<
  Offer,
  ChangeFavoriteArgs,
  ThunksAPI
>('favorites/changeFavorite', async ({ id, status }, { extra: api }) => {
  const { data } = await api.post<Offer>(
    `${APIRoute.Favorite}/${id}/${status}`
  );
  return data;
});
