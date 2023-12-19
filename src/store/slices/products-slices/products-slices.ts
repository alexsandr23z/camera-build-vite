import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TProductBasket, TProducts } from '../../../types/product';
import { fetchProducts } from '../../api-action/products-api/products-api';
import { loadBasketFromLocalStorage } from '../../../util/util';

type TProductsState = {
  products: TProducts;
  isLoading: boolean;
  basketProduct: TProductBasket[];
  basketCount: number;
  addedToCart: Record<string, boolean>;
  productQuantities: { [key: string]: number } | undefined;
}

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('productQuantities');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState) as { [key: string]: number };
  } catch (err) {
    return undefined;
  }
};

const initialState: TProductsState = {
  products: [],
  isLoading: false,
  basketProduct: loadBasketFromLocalStorage(),
  basketCount: loadBasketFromLocalStorage().length,
  addedToCart: JSON.parse(localStorage.getItem('addedToCart') || '{}') as Record<string, boolean>,
  productQuantities: loadState(),
};

const productsSlices = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addBasketProduct(state, action: PayloadAction<TProductBasket>) {
      const productId = action.payload.id;
      const existingProduct = state.basketProduct.find((product) => product.id === productId);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.basketProduct.push({ ...action.payload, quantity: 1 });
      }

      state.basketCount = state.basketProduct.length;
      if(state.productQuantities) {
        state.productQuantities[productId] = (state.productQuantities[productId] || 0) + 1;
      }
      localStorage.setItem('basket', JSON.stringify(state.basketProduct));
      localStorage.setItem('productQuantities', JSON.stringify(state.productQuantities));
    },
    removeBasketProduct(state, action: PayloadAction<number>) {
      const productIdToRemove = action.payload;
      state.basketProduct = state.basketProduct.filter((product) => product.id !== productIdToRemove);
      state.basketCount = state.basketProduct.length;

      localStorage.setItem('basket', JSON.stringify(state.basketProduct));
    },
    toggleAddedToCart(state, action: PayloadAction<{ productId: string; added: boolean }>) {
      const { productId, added } = action.payload;
      state.addedToCart = { ...(state.addedToCart || {}), [productId]: added };

      localStorage.setItem('addedToCart', JSON.stringify(state.addedToCart));
    },
    setQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
      const { productId, quantity } = action.payload;
      if(state.productQuantities) {
        state.productQuantities[productId] = quantity;
        localStorage.setItem('productQuantities', JSON.stringify(state.productQuantities));
      }
    },
    removeProduct(state, action: PayloadAction<string>) {
      const productIdToRemove = action.payload;
      if(state.productQuantities) {
        delete state.productQuantities[productIdToRemove];
        localStorage.setItem('productQuantities', JSON.stringify(state));
      }
    },
    removeBasketSucces(state) {
      state.basketProduct = [];
      state.basketCount = 0;
      state.addedToCart = {};

      localStorage.removeItem('addedToCart');
      localStorage.removeItem('basket');
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
export const { addBasketProduct, removeBasketProduct, toggleAddedToCart, removeBasketSucces, setQuantity, removeProduct, } = productsSlices.actions;

