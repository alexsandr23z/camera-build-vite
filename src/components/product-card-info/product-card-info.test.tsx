import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductCardInfo from './product-card-info';
import { productMock } from '../../mocks/mocks';
import { BrowserRouter } from 'react-router-dom';

describe('ProductCardInfo component', () => {
  it('renders product details correctly', () => {
    const {getByText, getByTestId} = render(
      <BrowserRouter>
        <ProductCardInfo product={productMock} />
      </BrowserRouter>
    );

    expect(getByTestId('product-title')).toHaveTextContent(productMock.name);

    fireEvent.click(getByTestId('add-to-cart-button'));

    expect(getByText('Добавить товар в корзину')).toBeInTheDocument();
  });
});
