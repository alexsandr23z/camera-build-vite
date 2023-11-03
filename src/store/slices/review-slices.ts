import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TReview, TReviews } from '../../types/review';
import { fetchReviews, submitReview } from '../api-action/review-api';


type TReviewsState = {
  reviews: TReviews;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
  isValid: boolean;
  isSends: boolean;
  cameraId: number | null;
}

const initialState: TReviewsState = {
  reviews: [],
  userName: '',
  advantage: '',
  disadvantage: '',
  review: '',
  rating: 0,
  isValid: false,
  isSends: false,
  cameraId: null,
};

const reviewsSlices = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview(state, action: PayloadAction<TReview>) {
      state.reviews.push(action.payload);
    },
    updateUserName(state, action: PayloadAction<string>) {
      state.userName = action.payload;
    },
    updateAdvantage(state, action: PayloadAction<string>) {
      state.advantage = action.payload;
    },
    updateDisadvantage(state, action: PayloadAction<string>) {
      state.disadvantage = action.payload;
    },
    updateReview(state, action: PayloadAction<string>) {
      state.review = action.payload;
    },
    updateRating(state, action: PayloadAction<number>) {
      state.rating = action.payload;
    },
    setFormReviewValid(state, action: PayloadAction<boolean>) {
      state.isValid = action.payload;
    },
    setCameraId(state, action: PayloadAction<number>) {
      state.cameraId = action.payload;
    },
    clearFormReview(state) {
      state.userName = '';
      state.advantage = '';
      state.disadvantage = '';
      state.review = '';
      state.rating = 0;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(submitReview.pending, (state) => {
        state.isSends = true;
      })
      .addCase(submitReview.fulfilled, (state) => {
        state.isSends = false;
      })
      .addCase(submitReview.rejected, (state) => {
        state.isSends = false;
      });
  }
});

export default reviewsSlices.reducer;

export const {addReview, updateAdvantage, updateDisadvantage,
  updateRating, updateReview, updateUserName, setFormReviewValid, clearFormReview} = reviewsSlices.actions;
