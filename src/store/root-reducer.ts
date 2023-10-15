import { combineReducers } from '@reduxjs/toolkit';
import productsSlices from './slices/products-slices';
import promoProductsSlices from './slices/promo-products-slices';
import paginationSlices from './slices/pagination-slices';
import productSlices from './slices/product-slices';


export const rootReducer = combineReducers({
  products: productsSlices,
  product: productSlices,
  promoProducts: promoProductsSlices,
  pagination: paginationSlices,
});
