import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { submitPromoCode } from '../../api-action/promo-code-api/promo-code-api';

type TPromoCodeState = {
  coupons: string;
  isSends: boolean;
  isValid: boolean;
}

const initialState: TPromoCodeState = {
  coupons: '',
  isSends: false,
  isValid: false,
};

const promoCodeSlices = createSlice({
  name: 'promoCode',
  initialState,
  reducers: {
    addPromoCode(state, action: PayloadAction<string>) {
      state.coupons = action.payload;
    },
    clearPromoCode(state) {
      state.coupons = '';
    },
    setIsSendsPromoCode(state) {
      state.isSends = true;
    },
    setPromoCodeValid(state, action: PayloadAction<boolean>) {
      state.isValid = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(submitPromoCode.pending, (state) => {
        state.isSends = true;
      })
      .addCase(submitPromoCode.fulfilled, (state) => {
        state.isSends = false;
      })
      .addCase(submitPromoCode.rejected, (state) => {
        state.isSends = false;
      });
  }
});

export default promoCodeSlices.reducer;

export const {addPromoCode, clearPromoCode, setIsSendsPromoCode,
  setPromoCodeValid} = promoCodeSlices.actions;
