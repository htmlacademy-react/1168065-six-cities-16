import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '@src/const';
import { OfferDetailed, Offer } from '@src/entities/offers';
import { AxiosInstance } from 'axios';
import { State } from '@src/entities/state';

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
>('offer/fetchOfferDetails', async (id, { extra: api }) => {
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
>('offer/fetchNearbyOffers', async (id, { extra: api }) => {
  const { data } = await api.get<Offer[]>(
    `${APIRoute.Offers}/${id}${APIRoute.Nearby}`
  );
  return data;
});
