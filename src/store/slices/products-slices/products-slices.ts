import { createSlice } from '@reduxjs/toolkit';
import { TProducts } from '../../../types/product';
import { fetchProducts } from '../../api-action/products-api/products-api';

type TProductsState = {
  products: TProducts;
  isLoading: boolean;
}

const initialState: TProductsState = {
  products: [],
  isLoading: false,
};

const productsSlices = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      });
  }
});

export default productsSlices.reducer;
