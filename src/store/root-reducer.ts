import { combineReducers } from '@reduxjs/toolkit';
import productsSlices from './slices/products-slices/products-slices';
import promoProductsSlices from './slices/promo-products-slices/promo-products-slices';
import paginationSlices from './slices/pagination-slices/pagination-slices';
import productSlices from './slices/product-slices/product-slices';
import productSimilarSlices from './slices/product-similar-slices/product-similar-slices';
import reviewSlices from './slices/review-slices/review-slices';
import promoCodeSlices from './slices/promo-code-slices/promo-code-slices';
import ordersSlices from './slices/orders-slices/orders-slices';

export const rootReducer = combineReducers({
  products: productsSlices,
  product: productSlices,
  promoProducts: promoProductsSlices,
  pagination: paginationSlices,
  productsSimilar: productSimilarSlices,
  reviews: reviewSlices,
  promoCode: promoCodeSlices,
  order: ordersSlices
});
