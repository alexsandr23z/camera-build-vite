import { render, fireEvent, screen } from '@testing-library/react';
import ProductsCard from './products-card';
import { productMock } from '../../mocks/mocks';
import { MemoryRouter } from 'react-router-dom';

describe('ProductsCard component', () => {

  it('renders product details correctly', () => {
    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <ProductsCard product={productMock} />
      </MemoryRouter>
    );

    expect(getByTestId('product-title')).toHaveTextContent(productMock.name);
    expect(getByText('Купить')).toBeInTheDocument();
  });

  it('opens modal on "Купить" button click', () => {
    render(
      <MemoryRouter>
        <ProductsCard product={productMock} />
      </MemoryRouter>
    );
    const buyButton = screen.getByText('Купить');
    fireEvent.click(buyButton);

    const closeButton = screen.getByLabelText('Закрыть попап');
    fireEvent.click(closeButton);

    const modal = screen.queryByRole('dialog');
    expect(modal).not.toBeInTheDocument();
  });
});
