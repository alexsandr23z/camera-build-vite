import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { State, AppDispatch } from '../../../types/state';
import { ApiRoute } from '../../../consts';
import { TPromoProducts } from '../../../types/promo-products';

export const fetchPromoProducts = createAsyncThunk<TPromoProducts, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/fetchPromoProducts',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TPromoProducts>(ApiRoute.PromoProducts);

    return data;
  },
);
