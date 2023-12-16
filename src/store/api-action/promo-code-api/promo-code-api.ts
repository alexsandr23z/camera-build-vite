import { AppDispatch, State } from '../../../types/state.ts';
import { AxiosInstance } from 'axios';
import { ApiRoute } from '../../../consts.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addPromoCode } from '../../slices/promo-code-slices/promo-code-slices.ts';

export const submitPromoCode = createAsyncThunk<void, { coupon: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/submitPromoCode',
  async ({ coupon }, { dispatch, extra: api }) => {
    const reqBody = {coupon: coupon};
    try {
      const { data } = await api.post<string>(`${ApiRoute.Coupons}`, reqBody);
      dispatch(addPromoCode(data));
    } catch {
      throw new Error('error');
    }
  }
);

