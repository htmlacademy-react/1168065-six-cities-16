import { createSlice } from '@reduxjs/toolkit';
import type { Offer, OfferDetailed } from '@src/entities/offers';
import type { State } from '@src/entities/state';
import type { LoadingStatus } from '@src/entities/statuses';
import { fetchNearbyOffers, fetchOfferDetails } from '../thunks/offer';
import type { Status } from '@src/entities/status';

type OfferState = {
  info: OfferDetailed;
  nearby: Offer[];
  offerLoadingStatus: Status;
};

const initialState = {
  info: {} as OfferDetailed,
  nearby: [],
  offerLoadingStatus: 'idle',
} as OfferState;

/**
 * Слайс для работы с предложениями
 */
export const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferDetails.pending, (state) => {
        state.offerLoadingStatus = true;
      })
      .addCase(fetchOfferDetails.fulfilled, (state, action) => {
        state.info = action.payload;
        state.offerLoadingStatus = false;
      })
      .addCase(fetchOfferDetails.rejected, (state) => {
        state.offerLoadingStatus = false;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearby = action.payload;
      });
  },
});

/**
 * Информация об объявлении
 */
export const getOfferInfo = (state: State): OfferDetailed => state.offer.info;

/**
 * Объявления рядом
 */
export const getNearbyOffers = (state: State): Offer[] => state.offer.nearby;

/**
 * Статус загрузки объявления
 */
export const getOfferLoadingStatus = (state: State): LoadingStatus =>
  state.offer.offerLoadingStatus;
