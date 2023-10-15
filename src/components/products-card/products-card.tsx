import React from 'react';
import { TProduct } from '../../types/product';
import { showActiveRateng, showDisabledRateng } from '../../util/util';
import {Link} from 'react-router-dom';
import { AppRoute } from '../../consts';

type TProductProps = {
  product: TProduct;
}

function ProductsCard({product}: TProductProps): React.JSX.Element {
  const {previewImg, previewImg2x, previewImgWebp, previewImgWebp2x,
    price, rating, reviewCount, name} = product;

  const activeRatingStar = showActiveRateng(rating);
  const disabledRatingStar = showDisabledRateng(rating);

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={previewImgWebp && previewImgWebp2x}
          />
          <img
            src={previewImg}
            srcSet={previewImg2x}
            width={280}
            height={240}
            alt={name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          { activeRatingStar.map((id) => (
            <svg key={id} width={17} height={16} aria-hidden="true">
              <use xlinkHref="#icon-full-star" />
            </svg>)
          )}
          { disabledRatingStar.map((id) => (
            <svg key={id} width={17} height={16} aria-hidden="true">
              <use xlinkHref="#icon-star" />
            </svg>)
          )}
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{reviewCount}
          </p>
        </div>
        <p className="product-card__title">
          {name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{`${price}₽`}
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
        >
          Купить
        </button>
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${product.id}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductsCard;
