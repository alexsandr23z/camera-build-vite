import { combineReducers } from '@reduxjs/toolkit';
import productsSlices from './slices/products-slices';


export const rootReducer = combineReducers({
  products: productsSlices,
});
