import React, { useState } from 'react';
import { TProduct } from '../../types/product';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import ModalAddProduct from '../modal-add-product/modal-add-product';
import Rating from '../rating/rating';
import { formatNumberPrice } from '../../util/util';
import ModalBasketAddProduct from '../modal-basket-add-product/modal-basket-add-product';
import { useAppDispatch, useAppSelector } from '../hook';
import { toggleAddedToCart } from '../../store/slices/products-slices/products-slices';

type TProductProps = {
  product: TProduct;
}

function ProductsCard({ product }: TProductProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [modalAddProductActive, setModalAddProductActive] = useState(false);
  const [modalBasketAddProductActive, setmodalBasketAddProductActive] = useState(false);
  const isAddedToCart = useAppSelector((state) => state.products.addedToCart[product.id]);
  const productQuantities = useAppSelector((state) => state.products.productQuantities);

  const handleToggleAddToCart = () => {
    dispatch(toggleAddedToCart({ productId: product.id as string, added: !isAddedToCart }));
  };

  const { previewImg, previewImg2x, previewImgWebp, previewImgWebp2x,
    price, rating, reviewCount, name } = product;

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
        <Rating rating={rating} reviewCount={reviewCount} />
        <p className="product-card__title" data-testid="product-title">
          {name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{formatNumberPrice(price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {productQuantities && productQuantities[String(product.id)] > 0 ? (
          <Link className="btn btn--purple-border product-card__btn product-card__btn--in-cart" to={AppRoute.Basket}>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>
            В корзине
          </Link>

        ) :
          (
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
          )}
        <ModalAddProduct onAddToCart={handleToggleAddToCart} product={product} modalAddProductActive={modalAddProductActive} setModalAddProductActive={setModalAddProductActive} setmodalBasketAddProductActive={setmodalBasketAddProductActive} />
        <ModalBasketAddProduct modalBasketAddProductActive={modalBasketAddProductActive} setmodalBasketAddProductActive={setmodalBasketAddProductActive} />
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${product.id}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductsCard;
