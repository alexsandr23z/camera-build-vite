import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ModalBasketAddProduct from './modal-basket-add-product';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

describe('ModalBasketAddProduct Component', () => {
  const mockProps = {
    modalBasketAddProductActive: true,
    setmodalBasketAddProductActive: vi.fn(),
  };

  it('renders the component with the given props', () => {
    const { getByText } = render(
      <BrowserRouter>
        <ModalBasketAddProduct {...mockProps}/>
      </BrowserRouter>
    );

    expect(getByText('Товар успешно добавлен в корзину')).toBeInTheDocument();
    expect(getByText('Продолжить покупки')).toBeInTheDocument();
    expect(getByText('Перейти в корзину')).toBeInTheDocument();
  });

  it('calls setmodalBasketAddProductActive(false) when Escape key is pressed', () => {
    const { getByText } = render(
      <BrowserRouter>
        <ModalBasketAddProduct {...mockProps} />
      </BrowserRouter>);
    const modalContent = getByText('Товар успешно добавлен в корзину');

    fireEvent.keyDown(modalContent, { key: 'Escape', code: 'Escape' });

    expect(mockProps.setmodalBasketAddProductActive).toHaveBeenCalledWith(false);
  });

  it('calls setmodalBasketAddProductActive(false) when clicking on the close button', () => {
    const { getByLabelText } = render(
      <BrowserRouter>
        <ModalBasketAddProduct {...mockProps} />
      </BrowserRouter>);
    const closeButton = getByLabelText('Закрыть попап');

    fireEvent.click(closeButton);

    expect(mockProps.setmodalBasketAddProductActive).toHaveBeenCalledWith(false);
  });

  it('calls setmodalBasketAddProductActive(false) when clicking on "Продолжить покупки"', () => {
    const { getByText } = render(
      <BrowserRouter>
        <ModalBasketAddProduct {...mockProps} />
      </BrowserRouter>);
    const continueShoppingButton = getByText('Продолжить покупки');

    fireEvent.click(continueShoppingButton);

    expect(mockProps.setmodalBasketAddProductActive).toHaveBeenCalledWith(false);
  });
});
