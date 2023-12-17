import orderSlices, { setIsSendsOrder, clearError, setOrderError } from './orders-slices';
import { submitOrder } from '../../api-action/orders-api/orders-api';

describe('Order Slices', () => {
  it('should handle setIsSendsOrder', () => {
    const initialState = {
      order: null,
      isSendsOrder: false,
      error: 'Some error',
    };

    const nextState = orderSlices(initialState, setIsSendsOrder());
    expect(nextState.isSendsOrder).toBe(true);
  });

  it('should handle clearError', () => {
    const initialState = {
      order: null,
      isSendsOrder: true,
      error: 'Some error',
    };

    const nextState = orderSlices(initialState, clearError());
    expect(nextState.error).toBeNull();
  });

  it('should handle setOrderError', () => {
    const initialState = {
      order: null,
      isSendsOrder: true,
      error: null,
    };

    const errorMessage = 'Error in order processing';
    const nextState = orderSlices(initialState, setOrderError(errorMessage));
    expect(nextState.error).toEqual(errorMessage);
  });

  it('should handle submitOrder.pending', () => {
    const initialState = {
      order: null,
      isSendsOrder: false,
      error: null,
    };

    const nextState = orderSlices(initialState, { type: submitOrder.pending.type });
    expect(nextState.isSendsOrder).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('should handle submitOrder.fulfilled', () => {
    const initialState = {
      order: null,
      isSendsOrder: true,
      error: 'Some error',
    };

    const nextState = orderSlices(initialState, { type: submitOrder.fulfilled.type });
    expect(nextState.isSendsOrder).toBe(false);
    expect(nextState.error).toBeNull();
  });

  it('should handle submitOrder.rejected', () => {
    const initialState = {
      order: null,
      isSendsOrder: true,
      error: null,
    };

    const errorMessage = 'Error in order submission';
    const nextState = orderSlices(initialState, { type: submitOrder.rejected.type, error: { message: errorMessage } });
    expect(nextState.isSendsOrder).toBe(false);
    expect(nextState.error).toEqual(errorMessage);
  });
});
