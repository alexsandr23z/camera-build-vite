import React, {useState} from 'react';
import { TProducts } from '../../types/product';
import ProductSimilarCard from '../../components/product-similar/product-similar-card';
import { PRODUCT_SIMILAR_END, PRODUCT_SIMILAR_START, PRODUCT_SIMILAR_STEP } from '../../consts';

type TProductsSimilarProps = {
  productsSimilar: TProducts;
}

function ProductSimilar({ productsSimilar }: TProductsSimilarProps): React.JSX.Element {
  const [showingProductsSimilarStart, setShowingProductsSimilarStart] = useState(PRODUCT_SIMILAR_START);
  const [showingProductsSimilarEnd, setShowingProductsSimilarEnd] = useState(PRODUCT_SIMILAR_END);
  const productsSimilarLength = productsSimilar.length;

  const handleNextClick = () => {
    setShowingProductsSimilarStart(showingProductsSimilarStart + PRODUCT_SIMILAR_STEP);
    setShowingProductsSimilarEnd(showingProductsSimilarEnd + PRODUCT_SIMILAR_STEP);
  };

  const handlePrevClick = () => {
    setShowingProductsSimilarStart(showingProductsSimilarStart - PRODUCT_SIMILAR_STEP);
    setShowingProductsSimilarEnd(showingProductsSimilarEnd - PRODUCT_SIMILAR_STEP);
  };

  if(!productsSimilar) {
    return <div></div>;
  }

  return (
    <section className='product-similar'>
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className='product-similar__slider-list'>
            {productsSimilar.slice(showingProductsSimilarStart, showingProductsSimilarEnd).map((product) => (
              <ProductSimilarCard key={product.id} product={product}/>
            ))}
          </div>
          <button
            onClick={handlePrevClick}
            disabled={showingProductsSimilarStart === 0}
            className="slider-controls slider-controls--prev"
            type="button"
            aria-label="Предыдущий слайд"
            data-testid="slider-prev-button"
          >
            <svg width={7} height={12} aria-hidden="true">
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
          <button
            onClick={handleNextClick}
            disabled={showingProductsSimilarEnd === productsSimilarLength}
            className="slider-controls slider-controls--next"
            type="button"
            aria-label="Следующий слайд"
            data-testid="slider-next-button"
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
