import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ModalAddProduct from './modal-add-product';
import { productMock } from '../../mocks/mocks';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureMockStore([]);

describe('ModalAddProduct component', () => {
  let store: MockStore;
  let initialState;

  beforeEach(() => {
    initialState = {
      product: {
        productMock
      },
    };
    store = mockStore(initialState);
  });

  it('renders with correct product details', () => {
    const setModalAddProductActive = vi.fn();
    const setmodalBasketAddProductActive = vi.fn();
    const onAddToCart = vi.fn();

    const { getByText, getByAltText, getByLabelText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ModalAddProduct
            product={productMock}
            modalAddProductActive
            setModalAddProductActive={setModalAddProductActive}
            setmodalBasketAddProductActive={setmodalBasketAddProductActive}
            onAddToCart={onAddToCart}
          />
        </BrowserRouter>
      </Provider>
    );

    expect(getByText('Retrocamera')).toBeInTheDocument();
    expect(getByAltText('Retrocamera')).toBeInTheDocument();
    expect(getByText('DA4IU67AD5')).toBeInTheDocument();
    expect(getByText('73 450 ₽')).toBeInTheDocument();

    const addButton = getByText('Добавить в корзину');
    expect(addButton).toBeInTheDocument();

    const closeButton = getByLabelText('Закрыть попап');
    fireEvent.click(closeButton);
    expect(setModalAddProductActive).toHaveBeenCalledWith(false);
  });
});
