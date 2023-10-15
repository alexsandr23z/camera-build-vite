import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state';
import { AxiosInstance } from 'axios';
import { ApiRoute } from '../../consts';
import { TProduct } from '../../types/product';

export const fetchProduct = createAsyncThunk<TProduct, Pick<TProduct, 'id'>, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/fetchProduct',
  async ({ id }, { extra: api }) => {
    const { data } = await api.get<TProduct>(`${ApiRoute.Products}/${id}`);

    return data;
  }
);
