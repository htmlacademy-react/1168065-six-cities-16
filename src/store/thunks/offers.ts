import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '@src/const';
import type { Offer, OfferDetailed } from '@src/entities/offers';
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

/**
 * Загрузка объявления
 */
export const fetchOfferDetails = createAsyncThunk<
  OfferDetailed,
  string,
  {
    state: State;
    extra: AxiosInstance;
  }
>('offers/fetchOffers', async (id, { extra: api }) => {
  const { data } = await api.get<OfferDetailed>(`${APIRoute.Offers}/${id}`);
  return data;
});

/**
 * Загрузка объявлений рядом
 */
export const fetchNearbyOffers = createAsyncThunk<
  Offer[],
  string,
  {
    state: State;
    extra: AxiosInstance;
  }
>('offers/fetchNearbyOffers', async (id, { extra: api }) => {
  const { data } = await api.get<Offer[]>(
    `${APIRoute.Offers}/${id}${APIRoute.Nearby}`
  );
  return data;
});
