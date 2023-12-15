import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TProduct, TProducts } from '../../../types/product';
import { fetchProducts } from '../../api-action/products-api/products-api';
import { loadBasketFromLocalStorage } from '../../../util/util';

type TProductsState = {
  products: TProducts;
  isLoading: boolean;
  basketProduct: TProducts;
  basketCount: number;
  addedToCart: Record<string, boolean>;
}

const initialState: TProductsState = {
  products: [],
  isLoading: false,
  basketProduct: loadBasketFromLocalStorage(),
  basketCount: loadBasketFromLocalStorage().length,
  addedToCart: JSON.parse(localStorage.getItem('addedToCart') || '{}') as Record<string, boolean>,
};

const productsSlices = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addBasketProduct(state, action: PayloadAction<TProduct>) {
      state.basketProduct.push(action.payload);
      state.basketCount = state.basketProduct.length;

      localStorage.setItem('basket', JSON.stringify(state.basketProduct));
    },
    removeBasketProduct(state, action: PayloadAction<number>) {
      const productIdToRemove = action.payload;
      state.basketProduct = state.basketProduct.filter((product) => product.id !== productIdToRemove);
      state.basketCount = state.basketProduct.length;

      localStorage.setItem('basket', JSON.stringify(state.basketProduct));
    },
    toggleAddedToCart(state, action: PayloadAction<{ productId: string; added: boolean }>) {
      const { productId, added } = action.payload;
      state.addedToCart[productId] = added;

      localStorage.setItem('addedToCart', JSON.stringify(state.addedToCart));
    },
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
export const { addBasketProduct, removeBasketProduct, toggleAddedToCart } = productsSlices.actions;

