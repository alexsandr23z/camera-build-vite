import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TProduct, TProducts } from '../../../types/product';
import { fetchProducts } from '../../api-action/products-api/products-api';
import { loadBasketFromLocalStorage } from '../../../util/util';

type TProductsState = {
  products: TProducts;
  isLoading: boolean;
  basketProduct: TProducts;
}

const initialState: TProductsState = {
  products: [],
  isLoading: false,
  basketProduct: loadBasketFromLocalStorage(),
};

const productsSlices = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addBasketProduct(state, action: PayloadAction<TProduct>) {
      state.basketProduct.push(action.payload);

      localStorage.setItem('basket', JSON.stringify(state.basketProduct));
    }
  },
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
export const { addBasketProduct } = productsSlices.actions;

