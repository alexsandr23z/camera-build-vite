import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { productMock, productsMock } from '../../mocks/mocks';
import ProductSimilar from './product-similar';
import ProductSimilarCard from './product-similar-card';
import { BrowserRouter } from 'react-router-dom';

const productsSimilarMock = productsMock;

describe('ProductSimilar component', () => {
  it('renders product similar section correctly', () => {
    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <ProductSimilar productsSimilar={productsSimilarMock} />
      </BrowserRouter>
    );

    expect(getByText('Похожие товары')).toBeInTheDocument();

    fireEvent.click(getByTestId('slider-next-button'));
    fireEvent.click(getByTestId('slider-prev-button'));
  });
});

describe('ProductSimilarCard component', () => {
  it('renders product similar card correctly', () => {
    const product = productMock;

    const { getByTestId } = render(
      <BrowserRouter>
        <ProductSimilarCard product={product} />
      </BrowserRouter>
    );

    expect(getByTestId('product-title')).toHaveTextContent(productMock.name);
  });
});

