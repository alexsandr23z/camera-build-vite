import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ModalAddProduct from './modal-add-product';
import { productMock } from '../../mocks/mocks';
import { vi } from 'vitest';

describe('ModalAddProduct component', () => {
  it('renders with correct product details', () => {
    const setModalAddProductActive = vi.fn();

    const { getByText, getByAltText, getByLabelText } = render(
      <ModalAddProduct
        product={productMock}
        modalAddProductActive
        setModalAddProductActive={setModalAddProductActive}
      />
    );

    expect(getByText('Retrocamera')).toBeInTheDocument();
    expect(getByAltText('Retrocamera')).toBeInTheDocument();
    expect(getByText('DA4IU67AD5')).toBeInTheDocument();
    expect(getByText('73450₽')).toBeInTheDocument();

    const addButton = getByText('Добавить в корзину');
    expect(addButton).toBeInTheDocument();

    const closeButton = getByLabelText('Закрыть попап');
    fireEvent.click(closeButton);
    expect(setModalAddProductActive).toHaveBeenCalledWith(false);
  });
});
