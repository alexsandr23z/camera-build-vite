import { productMock } from '../../../mocks/mocks';
import { fetchProduct } from '../../api-action/product-api/product-api';
import productSlices, { dropProduct } from './product-slices';

describe('Product Reducer', () => {
  it('should handle fetchProduct.pending', () => {
    const initialState = {
      product: null,
      isLoading: false,
    };

    const nextState = productSlices(initialState, { type: fetchProduct.pending.type });
    expect(nextState).toEqual({
      product: null,
      isLoading: true,
    });
  });

  it('should handle fetchProduct.fulfilled', () => {
    const initialState = {
      product: null,
      isLoading: true,
    };

    const payload = productMock;
    const nextState = productSlices(initialState, { type: fetchProduct.fulfilled.type, payload });
    expect(nextState).toEqual({
      product: payload,
      isLoading: false,
    });
  });

  it('should handle fetchProduct.rejected', () => {
    const initialState = {
      product: null,
      isLoading: true,
    };

    const nextState = productSlices(initialState, { type: fetchProduct.rejected.type });
    expect(nextState).toEqual({
      product: null,
      isLoading: false,
    });
  });

  it('should handle dropProduct', () => {
    const initialState = {
      product: productMock,
      isLoading: false,
    };

    const nextState = productSlices(initialState, dropProduct());
    expect(nextState).toEqual({
      product: null,
      isLoading: false,
    });
  });
});

