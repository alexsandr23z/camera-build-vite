import { AppDispatch, State } from '../../../types/state.ts';
import { AxiosInstance } from 'axios';
import { ApiRoute } from '../../../consts.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../../types/orders.ts';
import { addOrder } from '../../slices/orders-slices/orders-slices.ts';

export const submitOrder = createAsyncThunk<void, { order: TOrder }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/submitOrder',
  async ({ order }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<TOrder>(`${ApiRoute.Orders}`, order);
      dispatch(addOrder(data));
    } catch {
      throw new Error('error');
    }
  }
);
