import { combineReducers } from '@reduxjs/toolkit';
import productsSlices from './slices/products-slices';
import promoProductsSlices from './slices/promo-products-slices';


export const rootReducer = combineReducers({
  products: productsSlices,
  promoProducts: promoProductsSlices,
});
