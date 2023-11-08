import { createSlice } from '@reduxjs/toolkit';
import { TPromoProducts } from '../../../types/promo-products';
import { fetchPromoProducts } from '../../api-action/promo-products-api/promo-products-api';

type TPromoProductsState = {
  promoProducts: TPromoProducts;
  isLoading: boolean;
}

const initialState: TPromoProductsState = {
  promoProducts: [],
  isLoading: false,
};

const promoProductsSlices = createSlice({
  name: 'propoProducts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPromoProducts.fulfilled, (state, action) => {
        state.promoProducts = action.payload;
        state.isLoading = false;
      });
  }
});

export default promoProductsSlices.reducer;
