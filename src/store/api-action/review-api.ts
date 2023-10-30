import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state.ts';
import { AxiosInstance } from 'axios';
import { TReviews } from '../../types/review.ts';
import { TProduct } from '../../types/product.ts';
import { ApiRoute } from '../../consts.ts';

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
