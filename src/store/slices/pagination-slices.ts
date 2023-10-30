import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PAGINATION_PAGES_LENGTH } from '../../consts';

type TPaginationState = {
  limit: number;
  currentPage: number | null;
  isNewStep: boolean;
  maxProductIndex: number | null;
  minProductIndex: number | null;
  paginationPages: number[];
}

const initialState: TPaginationState = {
  limit: 9,
  currentPage: 1,
  isNewStep: false,
  maxProductIndex: null,
  minProductIndex: null,
  paginationPages: [1, 2, 3],
};

const paginationSlices = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
      state.maxProductIndex = state.currentPage * state.limit;
      state.minProductIndex = state.maxProductIndex - state.limit;
    },
    setPaginationPages(state, action: PayloadAction<number[]>) {
      state.paginationPages = action.payload;
    },
    setIsNewStep(state, action: PayloadAction<boolean>) {
      state.isNewStep = action.payload;
    },
    incrementPagination(state) {
      state.paginationPages = state.paginationPages.map((item) => item + PAGINATION_PAGES_LENGTH);
    },
    decrementPagination(state) {
      state.paginationPages = state.paginationPages.map((item) => item - PAGINATION_PAGES_LENGTH);
    },
  },
});

export default paginationSlices.reducer;
export const { setLimit, setCurrentPage, setIsNewStep, setPaginationPages, incrementPagination, decrementPagination} = paginationSlices.actions;
