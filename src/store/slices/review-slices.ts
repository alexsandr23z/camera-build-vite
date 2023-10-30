import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TReview, TReviews } from '../../types/review';
import { fetchReviews } from '../api-action/review-api';


type TReviewsState = {
  reviews: TReviews;
}

const initialState: TReviewsState = {
  reviews: []
};

const reviewsSlices = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview(state, action: PayloadAction<TReview>) {
      state.reviews.push(action.payload);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  }
});

export default reviewsSlices.reducer;

export const { addReview } = reviewsSlices.actions;
