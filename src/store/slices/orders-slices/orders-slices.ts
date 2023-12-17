import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../../types/orders';
import { submitOrder } from '../../api-action/orders-api/orders-api';

type TOrderState = {
  order: TOrder | null;
  isSendsOrder: boolean;
  error: string | null;
}

const initialState: TOrderState = {
  order: null,
  isSendsOrder: false,
  error: null,
};

const orderSlices = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<TOrder>) {
      state.order = action.payload;
    },
    clearOrder(state) {
      state.order = null;
    },
    setIsSendsOrder(state) {
      state.isSendsOrder = true;
    },
    clearError(state) {
      state.error = null;
    },
    setOrderError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.isSendsOrder = true;
        state.error = null;
      })
      .addCase(submitOrder.fulfilled, (state) => {
        state.isSendsOrder = false;
        state.error = null;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.isSendsOrder = false;
        state.error = action.error.message || null;
      });
  }
});

export default orderSlices.reducer;

export const {addOrder, clearOrder, setIsSendsOrder, clearError, setOrderError} = orderSlices.actions;
