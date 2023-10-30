import { createSlice } from '@reduxjs/toolkit';
import { TProducts } from '../../types/product';
import { fetchProductsSimilar } from '../api-action/product-similar-api';

type TProductsSimilarState = {
  productsSimilar: TProducts;
}

const initialState: TProductsSimilarState = {
  productsSimilar: []
};

const productsSimilarSlices = createSlice({
  name: 'productsSimilar',
  initialState,
  reducers: {
    dropProductsSimilar(state) {
      state.productsSimilar = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductsSimilar.fulfilled, (state, action) => {
        state.productsSimilar = action.payload;
      });
  }
});

export default productsSimilarSlices.reducer;
export const { dropProductsSimilar } = productsSimilarSlices.actions;
