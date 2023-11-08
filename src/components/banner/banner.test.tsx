import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Banner from './banner';

describe('Banner Component', () => {
  const promoProduct = {
    previewImg: 'path/to/previewImg.jpg',
    previewImg2x: 'path/to/previewImg2x.jpg',
    previewImgWebp: 'path/to/previewImg.webp',
    previewImgWebp2x: 'path/to/previewImgWebp2x.webp',
    name: 'Sample Product',
    id: 1,
  };

  it('renders with correct content', () => {
    const { getByText, getByAltText } = render(
      <BrowserRouter>
        <Banner promoProduct={promoProduct} />
      </BrowserRouter>
    );

    expect(getByText('Новинка!')).toBeInTheDocument();
    expect(getByText('Sample Product')).toBeInTheDocument();

    const link = getByText('Подробнее');
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/product/1');

    const image = getByAltText('баннер');
    expect(image).toBeInTheDocument();
    expect(image.getAttribute('src')).toBe('path/to/previewImg.jpg');
    expect(image.getAttribute('srcSet')).toBe('path/to/previewImg2x.jpg');
  });

  it('renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <Banner promoProduct={promoProduct} />
      </BrowserRouter>
    );

    expect(container).toBeDefined();
  });
});
