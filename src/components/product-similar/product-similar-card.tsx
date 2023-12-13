import React, {useState, useEffect} from 'react';
import { TProduct } from '../../types/product';
import Rating from '../rating/rating';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import ModalAddProduct from '../modal-add-product/modal-add-product';
import styles from './product.-similar.module.css';
import { formatNumberPrice } from '../../util/util';
import ModalBasketAddProduct from '../modal-basket-add-product/modal-basket-add-product';

type TProductsSimilarCardProps = {
  product: TProduct;
}

function ProductSimilarCard({ product }: TProductsSimilarCardProps): React.JSX.Element {
  const [modalAddProductActive, setModalAddProductActive] = useState(false);
  const [modalBasketAddProductActive, setmodalBasketAddProductActive] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(() => {
    const storedData = localStorage.getItem(`${product.id}`);
    return storedData ? (JSON.parse(storedData) as boolean) : false;
  });

  useEffect(() => {
    localStorage.setItem(`${product.id}`, JSON.stringify(isAddedToCart));
  }, [isAddedToCart, product.id]);

  return (
    <div className={`product-card is-active ${styles.productSimilarSliderListActive}`}>
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`/${product.previewImgWebp && product.previewImgWebp2x} 2x`}
          />
          <img
            src={`/${product.previewImg}`}
            srcSet={`/${product.previewImg2x} 2x`}
            width={280}
            height={240}
            alt={product.name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <Rating rating={product.rating} reviewCount={product.reviewCount} />
        <p className="product-card__title" data-testid="product-title">{product.name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{formatNumberPrice(product.price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {!isAddedToCart ? (
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
        ) :
          (
            <Link className="btn btn--purple-border product-card__btn product-card__btn--in-cart" to={AppRoute.Basket}>
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-basket"></use>
              </svg>
              В корзине
            </Link>
          )}
        <ModalAddProduct onAddToCart={() => setIsAddedToCart(true)} product={product} modalAddProductActive={modalAddProductActive} setModalAddProductActive={setModalAddProductActive} setmodalBasketAddProductActive={setmodalBasketAddProductActive}/>
        <ModalBasketAddProduct modalBasketAddProductActive={modalBasketAddProductActive} setmodalBasketAddProductActive={setmodalBasketAddProductActive}/>
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${product.id}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductSimilarCard;
