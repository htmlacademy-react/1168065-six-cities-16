import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '@src/const';
import type { AxiosInstance } from 'axios';
import type { State } from '@src/entities/state';
import { Offer } from '@src/entities/offers';

/**
 * Загрузка избранного
 */
export const fetchFavorites = createAsyncThunk<
  Offer[],
  undefined,
  {
    state: State;
    extra: AxiosInstance;
  }
>('favorites/fetchFavorites', async (_args, { extra: api }) => {
  const { data } = await api.get<Offer[]>(APIRoute.Favorite);
  return data;
});
