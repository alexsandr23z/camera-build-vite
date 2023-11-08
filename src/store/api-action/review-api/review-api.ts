import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../../types/state.ts';
import { AxiosInstance } from 'axios';
import { TAddReview, TReview, TReviews } from '../../../types/review.ts';
import { TProduct } from '../../../types/product.ts';
import { ApiRoute } from '../../../consts.ts';
import { addReview, clearFormReview } from '../../slices/review-slices/review-slices.ts';

export const fetchReviews = createAsyncThunk<TReviews, Pick<TProduct, 'id'>, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/fetchReviews',
  async ({ id }, { extra: api }) => {
    const { data } = await api.get<TReviews>(`${ApiRoute.Products}/${id}${ApiRoute.Reviews}`);

    return data;
  }
);

export const submitReview = createAsyncThunk<void, { reviewData: TAddReview }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/submitReview',
  async ({ reviewData }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<TReview>(`${ApiRoute.Reviews}`, reviewData);
      dispatch(addReview(data));
      dispatch(clearFormReview());
    } catch {
      throw new Error('error');
    }
  }
);
