import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BasketProduct from './basket-product';
import { vi } from 'vitest';
import { productMock } from '../../mocks/mocks';

describe('BasketProduct Component', () => {
  const mockProduct = productMock;

  const mockProps = {
    product: mockProduct,
    setModalBasketRemoveProductActive: vi.fn(),
    setSelectedProduct: vi.fn(),
    quantity: 1,
    setQuantity: vi.fn(),
  };

  it('renders the component with the provided product', () => {
    const { getByText, getByAltText } = render(
      <BasketProduct {...mockProps} />);

    expect(getByText(mockProduct.name)).toBeInTheDocument();
    expect(getByText(`${mockProduct.vendorCode}`)).toBeInTheDocument();
    expect(getByText(`${mockProduct.type} ${mockProduct.category}`)).toBeInTheDocument();
    expect(getByText(`${mockProduct.level} уровень`)).toBeInTheDocument();
    expect(getByAltText(mockProduct.name)).toBeInTheDocument();
  });

  it('handles quantity change correctly', () => {
    const { getByLabelText } = render(<BasketProduct {...mockProps} />);
    const quantityInput = getByLabelText('количество товара');

    fireEvent.change(quantityInput, { target: { value: '5' } });

    expect(mockProps.setQuantity).toHaveBeenCalledWith(5);
  });

  it('handles increase quantity button click correctly', () => {
    const { getByLabelText } = render(<BasketProduct {...mockProps} />);
    const increaseButton = getByLabelText('увеличить количество товара');

    fireEvent.click(increaseButton);

    expect(mockProps.setQuantity).toHaveBeenCalledWith(2);
  });

  it('handles delete product button click correctly', () => {
    const { getByLabelText } = render(<BasketProduct {...mockProps} />);
    const deleteButton = getByLabelText('Удалить товар');

    fireEvent.click(deleteButton);

    expect(mockProps.setModalBasketRemoveProductActive).toHaveBeenCalledWith(true);
    expect(mockProps.setSelectedProduct).toHaveBeenCalledWith(mockProduct);
  });
});
