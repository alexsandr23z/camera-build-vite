import { createSlice } from '@reduxjs/toolkit';
import { TProduct } from '../../types/product';
import { fetchProduct } from '../api-action/product-api';


type TProductState = {
  product: TProduct | null;
  isLoading: boolean;
}

const initialState: TProductState = {
  product: null,
  isLoading: false,
};

const productSlices = createSlice({
  name: 'product',
  initialState,
  reducers: {
    dropProduct(state) {
      state.product = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export default productSlices.reducer;

export const { dropProduct } = productSlices.actions;
