import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ModalBasketRemoveProduct from './modal-basket-remove-product';
import { productMock } from '../../mocks/mocks';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

describe('ModalBasketRemoveProduct Component', () => {
  const mockStore = configureStore();
  const store = mockStore({});

  const mockProps = {
    product: productMock,
    modalBasketRemoveProductActive: true,
    setModalBasketRemoveProductActive: vi.fn(),
    setQuantity: vi.fn(),
  };

  it('renders the component with the given props', () => {
    const { getByText, getByAltText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ModalBasketRemoveProduct {...mockProps} />
        </BrowserRouter>
      </Provider>
    );

    expect(getByText('Удалить этот товар?')).toBeInTheDocument();
    expect(getByAltText(mockProps.product.name)).toBeInTheDocument();
    expect(getByText('Продолжить покупки')).toBeInTheDocument();
  });

  it('calls setModalBasketRemoveProductActive(false) when Escape key is pressed', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ModalBasketRemoveProduct {...mockProps} />
        </BrowserRouter>
      </Provider>
    );
    const modalContent = getByText('Удалить этот товар?');

    fireEvent.keyDown(modalContent, { key: 'Escape', code: 'Escape' });

    expect(mockProps.setModalBasketRemoveProductActive).toHaveBeenCalledWith(false);
  });

  it('calls setModalBasketRemoveProductActive(false) when clicking on the close button', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ModalBasketRemoveProduct {...mockProps} />
        </BrowserRouter>
      </Provider>
    );
    const closeButton = getByLabelText('Закрыть попап');

    fireEvent.click(closeButton);

    expect(mockProps.setModalBasketRemoveProductActive).toHaveBeenCalledWith(false);
  });
});
