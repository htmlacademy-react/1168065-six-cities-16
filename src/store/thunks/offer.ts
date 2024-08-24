import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '@src/const';
import { OfferDetailed, Offer } from '@src/entities/offers';
import { ThunksAPI } from '@src/entities/state';

/**
 * Загрузка объявления
 */
export const fetchOfferDetails = createAsyncThunk<
  OfferDetailed,
  string,
  ThunksAPI
>('offer/fetchOfferDetails', async (id, { extra: api }) => {
  const { data } = await api.get<OfferDetailed>(`${APIRoute.Offers}/${id}`);
  return data;
});

/**
 * Загрузка объявлений рядом
 */
export const fetchNearbyOffers = createAsyncThunk<Offer[], string, ThunksAPI>(
  'offer/fetchNearbyOffers',
  async (id, { extra: api }) => {
    const { data } = await api.get<Offer[]>(
      `${APIRoute.Offers}/${id}${APIRoute.Nearby}`
    );
    return data;
  }
);
