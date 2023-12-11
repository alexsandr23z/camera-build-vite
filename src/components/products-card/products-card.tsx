import React, {useState} from 'react';
import { TProduct } from '../../types/product';
import {Link} from 'react-router-dom';
import { AppRoute } from '../../consts';
import ModalAddProduct from '../modal-add-product/modal-add-product';
import Rating from '../rating/rating';
import { formatNumberPrice } from '../../util/util';

type TProductProps = {
  product: TProduct;
}

function ProductsCard({product}: TProductProps): React.JSX.Element {
  const [modalAddProductActive, setModalAddProductActive] = useState(false);

  const {previewImg, previewImg2x, previewImgWebp, previewImgWebp2x,
    price, rating, reviewCount, name} = product;

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
        <Rating rating={rating} reviewCount={reviewCount}/>
        <p className="product-card__title" data-testid="product-title">
          {name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{formatNumberPrice(price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
          onClick={() => {
            document.body.style.overflow = 'hidden';
            setModalAddProductActive(true);
          }}
        >
          Купить
        </button>
        <ModalAddProduct product={product} modalAddProductActive={modalAddProductActive} setModalAddProductActive={setModalAddProductActive}/>
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${product.id}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductsCard;
