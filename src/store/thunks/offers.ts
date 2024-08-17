import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '@src/const';
import type { Offer } from '@src/entities/offers';
import type { AxiosInstance } from 'axios';
import type { State } from '@src/entities/state';

/**
 * Загрузка объявлений
 */
export const fetchOffers = createAsyncThunk<
  Offer[],
  undefined,
  {
    state: State;
    extra: AxiosInstance;
  }
>('offers/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offer[]>(APIRoute.Offers);
  return data;
});
