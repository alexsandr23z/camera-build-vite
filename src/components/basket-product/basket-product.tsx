import React from 'react';
import { formatNumberPrice } from '../../util/util';
import { TProduct } from '../../types/product';

type TBasketProductProps = {
  product: TProduct;
  setModalBasketRemoveProductActive: (arg: boolean) => void;
  setSelectedProduct: (arg: TProduct | null) => void;
  quantity: number;
  setQuantity: (arg: number) => void;
}

function BasketProduct({product, setModalBasketRemoveProductActive, setSelectedProduct, quantity, setQuantity}: TBasketProductProps): React.JSX.Element {
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, '');
    value = value.replace(/^0+/, '');
    value = String(Math.max(1, Math.min(parseInt(value, 10) || 1, 99)));

    setQuantity(Number(value));
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1);
    }
  };

  const handleDeliteProduct = () => {
    document.body.style.overflow = 'hidden';
    setModalBasketRemoveProductActive(true);
    setSelectedProduct(product);
  };

  return (
    <li key={product.id} className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source
            type="image/webp"
            srcSet={product.previewImgWebp && product.previewImgWebp2x}
          />
          <img
            src={product.previewImg}
            srcSet={product.previewImg2x}
            width={140}
            height={120}
            alt={product.name}
          />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{product.name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>{''}
            <span className="basket-item__number">{product.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">
            {product.type} {product.category}
          </li>
          <li className="basket-item__list-item">
            {product.level} уровень
          </li>
        </ul>
      </div>
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>{formatNumberPrice(product.price)} ₽
      </p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          onClick={handleDecreaseQuantity}
          disabled={quantity === 1}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
        <label className="visually-hidden" htmlFor={`counter${product.id}`} />
        <input
          type="text"
          id={`counter${product.id}`}
          value={quantity}
          min={1}
          max={99}
          aria-label="количество товара"
          onChange={handleQuantityChange}
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={handleIncreaseQuantity}
          disabled={quantity === 99}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>{formatNumberPrice(product.price * quantity)} ₽
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={handleDeliteProduct}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </li>

  );
}

export default BasketProduct;
