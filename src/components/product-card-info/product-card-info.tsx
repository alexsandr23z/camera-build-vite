import React, {useState} from 'react';
import { TProduct } from '../../types/product';
import ModalAddProduct from '../modal-add-product/modal-add-product';
import ProductTabs from '../product-tabs/product-tabs';
import Rating from '../rating/rating';
import { formatNumberPrice } from '../../util/util';

type TProductCardInfoProps = {
  product: TProduct;
}

function ProductCardInfo({product}: TProductCardInfoProps): React.JSX.Element {
  const [modalAddProductActive, setModalAddProductActive] = useState(false);
  const {previewImg, previewImg2x, previewImgWebp, previewImgWebp2x,
    price, name, rating, reviewCount} = product;

  return (
    <div className="container">
      <div className="product__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`/${previewImgWebp && previewImgWebp2x} 2x`}
          />
          <img
            src={`/${previewImg}`}
            srcSet={`/${previewImg2x} 2x`}
            width={560}
            height={480}
            alt={name}
          />
        </picture>
      </div>
      <div className="product__content">
        <h1 className="title title--h3" data-testid="product-title">{name}</h1>
        <Rating rating={rating} reviewCount={reviewCount}/>
        <p className="product__price">
          <span className="visually-hidden">Цена:</span>{formatNumberPrice(price)} ₽
        </p>
        <button className="btn btn--purple" type="button"
          data-testid="add-to-cart-button"
          onClick={() => {
            document.body.style.overflow = 'hidden';
            setModalAddProductActive(true);
          }}
        >
          <svg width={24} height={16} aria-hidden="true">
            <use xlinkHref="#icon-add-basket" />
          </svg>
          Добавить в корзину
        </button>
        <ModalAddProduct product={product} modalAddProductActive={modalAddProductActive} setModalAddProductActive={setModalAddProductActive}/>
        <ProductTabs product={product}/>
      </div>
    </div>
  );
}

export default ProductCardInfo;
