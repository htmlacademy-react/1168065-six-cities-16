import { SORTING_CONFIG } from '@src/const';
import { setActiveSorting, sortingSlice } from './sorting-slice';

describe('Sorting Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      sorting: SORTING_CONFIG[0],
    };

    const result = sortingSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      sorting: SORTING_CONFIG[0],
    };

    const result = sortingSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return new active sorting', () => {
    const initialState = { sorting: SORTING_CONFIG[0] };
    const expectedState = { sorting: SORTING_CONFIG[1] };

    const result = sortingSlice.reducer(
      initialState,
      setActiveSorting(SORTING_CONFIG[1])
    );

    expect(result).toEqual(expectedState);
  });
});
