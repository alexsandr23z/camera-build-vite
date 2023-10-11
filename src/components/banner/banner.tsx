import React from 'react';
import { TPromoProduct } from '../../types/promo-products';
import {Link} from 'react-router-dom';
import { AppRoute } from '../../consts';

type TPromoProductProps = {
  promoProduct: TPromoProduct;
}

function Banner({promoProduct}: TPromoProductProps): React.JSX.Element {
  const {previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, name, id} = promoProduct;

  return (
    <div className="banner">
      <picture>
        <source
          type="image/webp"
          srcSet={previewImgWebp && previewImgWebp2x}
        />
        <img
          src={previewImg}
          srcSet={previewImg2x}
          width={1280}
          height={280}
          alt="баннер"
        />
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">
          {name}
        </span>
        <span className="banner__text">
          Профессиональная камера от&nbsp;известного производителя
        </span>
        <Link className="btn" to={`${AppRoute.Product}/${id}`}>
          Подробнее
        </Link>
      </p>
    </div>
  );
}

export default Banner;
