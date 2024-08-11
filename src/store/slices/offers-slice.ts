import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { Offer } from '@src/entities/offers';
import type { State } from '@src/entities/state';
import { APIRoute } from '@src/const';
import { AxiosInstance } from 'axios';
import { LoadingStatus } from '@src/entities/statuses';

type OffersState = {
  offers: Offer[];
  offersLoadingStatus: LoadingStatus;
  offersError: boolean;
};

const initialState = {
  offers: [],
  offersLoadingStatus: 'idle',
  offersError: false,
} as OffersState;

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
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.offersLoadingStatus = true;
      })
      .addCase(
        fetchOffers.fulfilled,
        (state, action: PayloadAction<Offer[]>) => {
          state.offers = action.payload;
          state.offersLoadingStatus = false;
        }
      )
      .addCase(fetchOffers.rejected, (state) => {
        state.offersLoadingStatus = false;
        state.offersError = true;
      });
  },
});

export const getOffers = (state: State): Offer[] => state.offers.offers;
export const getOffersLoadingStatus = (state: State): LoadingStatus =>
  state.offers.offersLoadingStatus;
export const getOffersError = (state: State): boolean =>
  state.offers.offersError;
