import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import ModalBasketProductSuccess from './modal-basket-product-success';

describe('ModalBasketProductSuccess Component', () => {
  const mockProps = {
    modalBasketProductSuccessActive: true,
    setModalBasketProductSuccessActive: vi.fn(),
  };

  it('renders the component with the given props', () => {
    const { getByText } = render(
      <BrowserRouter>
        <ModalBasketProductSuccess {...mockProps} />
      </BrowserRouter>);

    expect(getByText('Спасибо за покупку')).toBeInTheDocument();
    expect(getByText('Вернуться к покупкам')).toBeInTheDocument();
  });

  it('calls setModalBasketProductSuccessActive(false) when Escape key is pressed', () => {
    const { getByText } = render(
      <BrowserRouter>
        <ModalBasketProductSuccess {...mockProps} />
      </BrowserRouter>);
    const modalContent = getByText('Спасибо за покупку');

    fireEvent.keyDown(modalContent, { key: 'Escape', code: 'Escape' });

    expect(mockProps.setModalBasketProductSuccessActive).toHaveBeenCalledWith(false);
  });

  it('calls setModalBasketProductSuccessActive(false) when clicking on the overlay', () => {
    const { getByText } = render(
      <BrowserRouter>
        <ModalBasketProductSuccess {...mockProps} />
      </BrowserRouter>);
    const overlay = getByText('Спасибо за покупку');

    fireEvent.click(overlay);

    expect(mockProps.setModalBasketProductSuccessActive).toHaveBeenCalledWith(false);
  });

  it('calls setModalBasketProductSuccessActive(false) when clicking on the close button', () => {
    const { getByLabelText } = render(
      <BrowserRouter>
        <ModalBasketProductSuccess {...mockProps} />
      </BrowserRouter>);
    const closeButton = getByLabelText('Закрыть попап');

    fireEvent.click(closeButton);

    expect(mockProps.setModalBasketProductSuccessActive).toHaveBeenCalledWith(false);
  });
});
