import { productsMock } from '../../../mocks/mocks';
import { fetchProductsSimilar } from '../../api-action/product-similar-api/product-similar-api';
import productSimilarSlices from './product-similar-slices';

describe('ProductSimilar Reducer', () => {
  it('should handle fetchProductsSimilar.fulfilled', () => {
    const initialState = {
      productsSimilar: []
    };

    const payload = productsMock;
    const nextState = productSimilarSlices(initialState, { type: fetchProductsSimilar.fulfilled.type, payload });
    expect(nextState).toEqual({
      productsSimilar: payload,
    });
  });
});
