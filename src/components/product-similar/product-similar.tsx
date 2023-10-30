import React from 'react';
import { TProducts } from '../../types/product';
import ProductSimilarCard from '../../components/product-similar/product-similar-card';

type TProductsSimilarProps = {
  productsSimilar: TProducts;
}

function ProductSimilar({ productsSimilar }: TProductsSimilarProps): React.JSX.Element {
  console.log(productsSimilar);

  return (
    <section className='product-similar'>
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {productsSimilar.slice(0, 3).map((product) => (
              <ProductSimilarCard key={product.id} product={product} />
            ))}
          </div>
          <button
            className="slider-controls slider-controls--prev"
            type="button"
            aria-label="Предыдущий слайд"
          >
            <svg width={7} height={12} aria-hidden="true">
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
          <button
            className="slider-controls slider-controls--next"
            type="button"
            aria-label="Следующий слайд"
          >
            <svg width={7} height={12} aria-hidden="true">
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductSimilar;
