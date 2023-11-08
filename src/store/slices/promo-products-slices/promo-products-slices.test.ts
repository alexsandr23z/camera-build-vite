import { productsMock } from '../../../mocks/mocks';
import { fetchPromoProducts } from '../../api-action/promo-products-api/promo-products-api';
import promoProductsSlices from './promo-products-slices';

describe('PromoProducts Reducer', () => {
  it('should handle fetchPromoProducts.pending', () => {
    const initialState = {
      promoProducts: [],
      isLoading: false,
    };

    const nextState = promoProductsSlices(initialState, { type: fetchPromoProducts.pending.type });
    expect(nextState).toEqual({
      promoProducts: [],
      isLoading: true,
    });
  });

  it('should handle fetchPromoProducts.fulfilled', () => {
    const initialState = {
      promoProducts: [],
      isLoading: true,
    };

    const payload = productsMock;
    const nextState = promoProductsSlices(initialState, { type: fetchPromoProducts.fulfilled.type, payload });
    expect(nextState).toEqual({
      promoProducts: payload,
      isLoading: false,
    });
  });
});
