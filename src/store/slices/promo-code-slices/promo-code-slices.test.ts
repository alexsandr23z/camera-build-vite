import { submitPromoCode } from '../../api-action/promo-code-api/promo-code-api';
import promoCodeSlices, { addPromoCode, setPromoCodeValid, setIsSendsPromoCode } from './promo-code-slices';

describe('PromoCode Reducer', () => {
  it('should handle submitPromoCode.pending', () => {
    const initialState = {
      coupons: '',
      isSends: false,
      isValid: false,
    };

    const nextState = promoCodeSlices(initialState, { type: submitPromoCode.pending.type });
    expect(nextState).toEqual({
      coupons: '',
      isSends: true,
      isValid: false,
    });
  });

  it('should handle submitPromoCode.rejected', () => {
    const initialState = {
      coupons: '',
      isSends: true,
      isValid: false,
    };

    const nextState = promoCodeSlices(initialState, { type: submitPromoCode.rejected.type });
    expect(nextState).toEqual({
      coupons: '',
      isSends: false,
      isValid: false,
    });
  });

  it('should handle addPromoCode', () => {
    const initialState = {
      coupons: '',
      isSends: false,
      isValid: false,
    };

    const nextState = promoCodeSlices(initialState, addPromoCode('TESTCODE'));
    expect(nextState).toEqual({
      coupons: 'TESTCODE',
      isSends: false,
      isValid: false,
    });
  });

  it('should handle setPromoCodeValid', () => {
    const initialState = {
      coupons: '',
      isSends: false,
      isValid: false,
    };

    const nextState = promoCodeSlices(initialState, setPromoCodeValid(true));
    expect(nextState).toEqual({
      coupons: '',
      isSends: false,
      isValid: true,
    });
  });

  it('should handle setIsSendsPromoCode', () => {
    const initialState = {
      coupons: '',
      isSends: false,
      isValid: false,
    };

    const nextState = promoCodeSlices(initialState, setIsSendsPromoCode());
    expect(nextState).toEqual({
      coupons: '',
      isSends: true,
      isValid: false,
    });
  });
});
