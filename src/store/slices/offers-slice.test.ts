import { LoadingStatus } from '@src/entities/statuses';
import { offersSlice, setActiveOffer } from './offers-slice';
import { fetchOffers } from '../thunks/offers';
import { offers } from '@src/mocks/offers';

describe('Offers Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      activeOffer: null,
      offers: [],
      offersLoadingStatus: 'idle' as LoadingStatus,
      offersError: false,
    };

    const result = offersSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      activeOffer: null,
      offers: [],
      offersLoadingStatus: 'idle',
      offersError: false,
    };

    const result = offersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "offersLoadingStatus" to "true" with "fetchOffers.pending"', () => {
    const expectedState = {
      activeOffer: null,
      offers: [],
      offersLoadingStatus: true,
      offersError: false,
    };

    const result = offersSlice.reducer(undefined, fetchOffers.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "offers" to array with offers, "offersLoadingStatus" to "false" with "fetchOffers.fullfilled"', () => {
    const expectedState = {
      activeOffer: null,
      offers: offers,
      offersLoadingStatus: false,
      offersError: false,
    };

    const result = offersSlice.reducer(
      undefined,
      fetchOffers.fulfilled(offers, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "offersLoadingStatus" to "false", "offersError" to "true" with "fetchOffers.rejected"', () => {
    const expectedState = {
      activeOffer: null,
      offers: [],
      offersLoadingStatus: false,
      offersError: true,
    };

    const result = offersSlice.reducer(undefined, fetchOffers.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "activeOffer" with "setActiveOffer"', () => {
    const initialState = {
      activeOffer: null,
      offers: offers,
      offersLoadingStatus: false,
      offersError: false,
    };

    const expectedState = {
      activeOffer: offers[0].id,
      offers: offers,
      offersLoadingStatus: false,
      offersError: false,
    };

    const result = offersSlice.reducer(
      initialState,
      setActiveOffer(offers[0].id)
    );

    expect(result).toEqual(expectedState);
  });
});
