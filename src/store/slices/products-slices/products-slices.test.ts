import { productsMock } from '../../../mocks/mocks';
import { fetchProducts } from '../../api-action/products-api/products-api';
import productsSlices from './products-slices';

describe('Products Reducer', () => {
  it('should handle fetchProducts.pending', () => {
    const initialState = {
      products: [],
      isLoading: false,
      basketProduct: [],
      basketCount: 1,
      addedToCart: {},
    };

    const nextState = productsSlices(initialState, { type: fetchProducts.pending.type });
    expect(nextState).toEqual({
      products: [],
      isLoading: true,
      basketProduct: [],
      basketCount: 1,
      addedToCart: {},
    });
  });

  it('should handle fetchProducts.fulfilled', () => {
    const initialState = {
      products: [],
      isLoading: true,
      basketProduct: [],
      basketCount: 1,
      addedToCart: {},
    };

    const payload = productsMock;
    const nextState = productsSlices(initialState, { type: fetchProducts.fulfilled.type, payload });
    expect(nextState).toEqual({
      products: payload,
      isLoading: false,
      basketProduct: [],
      basketCount: 1,
      addedToCart: {},
    });
  });
});
