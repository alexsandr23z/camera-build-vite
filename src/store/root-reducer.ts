import { combineReducers } from '@reduxjs/toolkit';
import productsSlices from './slices/products-slices';
import promoProductsSlices from './slices/promo-products-slices';
import paginationSlices from './slices/pagination-slices';
import productSlices from './slices/product-slices';
import productTabsSlices from './slices/product-tabs-slices';
import productSimilarSlices from './slices/product-similar-slices';
import reviewSlices from './slices/review-slices';

export const rootReducer = combineReducers({
  products: productsSlices,
  product: productSlices,
  promoProducts: promoProductsSlices,
  pagination: paginationSlices,
  productTabs: productTabsSlices,
  productsSimilar: productSimilarSlices,
  reviews: reviewSlices,
});
