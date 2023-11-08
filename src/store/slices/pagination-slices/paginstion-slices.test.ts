import paginationSlices, {
  setLimit,
  setCurrentPage,
  incrementPagination,
  decrementPagination
} from './pagination-slices';

describe('Pagination Reducer', () => {
  it('should handle setLimit', () => {
    const initialState = {
      limit: 9,
      currentPage: 1,
      maxProductIndex: null,
      minProductIndex: null,
      paginationPages: [1, 2, 3],
    };

    const payload = 12;
    const nextState = paginationSlices(initialState, setLimit(payload));
    expect(nextState.limit).toEqual(payload);
  });

  it('should handle setCurrentPage', () => {
    const initialState = {
      limit: 9,
      currentPage: 1,
      maxProductIndex: null,
      minProductIndex: null,
      paginationPages: [1, 2, 3],
    };

    const payload = 3;
    const nextState = paginationSlices(initialState, setCurrentPage(payload));
    expect(nextState.currentPage).toEqual(payload);
    expect(nextState.maxProductIndex).toEqual(payload * initialState.limit);
    expect(nextState.minProductIndex).toEqual((payload * initialState.limit) - initialState.limit);
  });

  it('should handle incrementPagination', () => {
    const initialState = {
      limit: 9,
      currentPage: 1,
      maxProductIndex: null,
      minProductIndex: null,
      paginationPages: [1, 2, 3],
    };

    const nextState = paginationSlices(initialState, incrementPagination());
    expect(nextState.paginationPages).toEqual([4, 5, 6]);
  });

  it('should handle decrementPagination', () => {
    const initialState = {
      limit: 9,
      currentPage: 1,
      maxProductIndex: null,
      minProductIndex: null,
      paginationPages: [1, 2, 3],
    };

    const nextState = paginationSlices(initialState, decrementPagination());
    expect(nextState.paginationPages).toEqual([-2, -1, 0]);
  });
});
