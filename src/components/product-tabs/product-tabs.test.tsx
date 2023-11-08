import { render, fireEvent } from '@testing-library/react';
import ProductTabs from './product-tabs';
import { productMock } from '../../mocks/mocks';
import { BrowserRouter } from 'react-router-dom';

describe('ProductTabs component', () => {
  it('renders the tabs correctly', () => {
    const { getByText } = render(
      <BrowserRouter>
        <ProductTabs product={productMock} />
      </BrowserRouter>
    );

    expect(getByText('Характеристики')).toBeInTheDocument();
    expect(getByText('Описание')).toBeInTheDocument();
  });

  it('switches to the "Характеристики" tab when clicked', () => {
    const { getByText } = render(
      <BrowserRouter>
        <ProductTabs product={productMock} />
      </BrowserRouter>
    );

    fireEvent.click(getByText('Характеристики'));

    expect(getByText('Артикул:')).toBeInTheDocument();
    expect(getByText('Категория:')).toBeInTheDocument();
    expect(getByText('Тип камеры:')).toBeInTheDocument();
    expect(getByText('Уровень:')).toBeInTheDocument();
  });

  it('switches to the "Описание" tab when clicked', () => {
    const { getByText } = render(
      <BrowserRouter>
        <ProductTabs product={productMock} />
      </BrowserRouter>
    );

    fireEvent.click(getByText('Описание'));

    expect(getByText('Description 1')).toBeInTheDocument();
  });
});
