import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ActiveOffer, Offer } from '@src/entities/offers';
import type { State } from '@src/entities/state';
import { APIRoute } from '@src/const';
import type { AxiosInstance } from 'axios';
import type { LoadingStatus } from '@src/entities/statuses';

type OffersState = {
  activeOffer: ActiveOffer;
  offers: Offer[];
  offersLoadingStatus: LoadingStatus;
  offersError: boolean;
};

const initialState = {
  activeOffer: null,
  offers: [],
  offersLoadingStatus: 'idle',
  offersError: false,
} as OffersState;

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
 * Слайс для работы с предложениями
 */
export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    /**
     * Запись активного объявления
     */
    setActiveOffer: (state, action: PayloadAction<ActiveOffer>) => {
      state.activeOffer = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.offersLoadingStatus = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.offersLoadingStatus = false;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.offersLoadingStatus = false;
        state.offersError = true;
      });
  },
});

export const { setActiveOffer } = offersSlice.actions;

/**
 * Объявления
 */
export const getOffers = (state: State): Offer[] => state.offers.offers;

/**
 * Активное объявление
 */
export const getActiveOffer = (state: State): ActiveOffer =>
  state.offers.activeOffer;

/**
 * Статус загрузки объявлений
 */
export const getOffersLoadingStatus = (state: State): LoadingStatus =>
  state.offers.offersLoadingStatus;

/**
 * Статус ошибки по загрузке объявлений
 */
export const getOffersError = (state: State): boolean =>
  state.offers.offersError;
