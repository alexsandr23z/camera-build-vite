import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../../types/state.ts';
import { AxiosInstance } from 'axios';
import { TProduct, TProducts } from '../../../types/product.ts';
import { ApiRoute } from '../../../consts.ts';

export const fetchProductsSimilar = createAsyncThunk<TProducts, Pick<TProduct, 'id'>, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/fetchProductsSimilar',
  async ({ id }, { extra: api }) => {
    const { data } = await api.get<TProducts>(`${ApiRoute.Products}/${id}${ApiRoute.Similar}`);

    return data;
  }
);
