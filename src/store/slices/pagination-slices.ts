import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TPaginationState = {
  page: number;
  limit: number;
  currentPage: number;
  isNewStep: boolean;
  maxProductIndex: number | null;
  minProductIndex: number | null;
}

const initialState: TPaginationState = {
  page: 1,
  limit: 9,
  currentPage: 1,
  isNewStep: false,
  maxProductIndex: null,
  minProductIndex: null,
};

const paginationSlices = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
      state.maxProductIndex = state.currentPage * state.limit;
      state.minProductIndex = state.maxProductIndex - state.limit;
    },
    setIsNewStep(state, action: PayloadAction<boolean>) {
      state.isNewStep = action.payload;
    },
  },
});

export default paginationSlices.reducer;
export const { setPage, setLimit, setCurrentPage, setIsNewStep} = paginationSlices.actions;
