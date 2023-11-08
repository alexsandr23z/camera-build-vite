import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { State, AppDispatch } from '../../../types/state';
import { ApiRoute } from '../../../consts';
import { TProducts } from '../../../types/product';


export const fetchProducts = createAsyncThunk<TProducts, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/fetchProducts',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TProducts>(ApiRoute.Products);

    return data;
  },
);
