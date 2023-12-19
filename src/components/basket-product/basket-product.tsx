import React, { useState, useEffect } from 'react';
import { formatNumberPrice } from '../../util/util';
import { TProduct } from '../../types/product';
import { END_QUANTITY, START_QUANTITY } from '../../consts';

type TBasketProductProps = {
  product: TProduct;
  setModalBasketRemoveProductActive: (arg: boolean) => void;
  setSelectedProduct: (arg: TProduct | null) => void;
  quantity: number;
  setQuantity: (arg: number) => void;
}

function BasketProduct({ product, setModalBasketRemoveProductActive, setSelectedProduct, quantity, setQuantity }: TBasketProductProps): React.JSX.Element {
  const [inputValue, setInputValue] = useState<string | null>(null);

  useEffect(() => {
    setInputValue(quantity === 0 ? null : String(quantity));
  }, [quantity]);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, '');
    value = value === '' ? '' : String(Math.min(parseInt(value, 10) || START_QUANTITY, END_QUANTITY));
    setInputValue(value);
    if (value !== '') {
      setQuantity(Number(value));
    }
  };

  const handleBlur = () => {
    if (inputValue === null || inputValue === '') {
      setInputValue(String(1));
      setQuantity(1);
    } else {
      setQuantity(Number(inputValue));
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > START_QUANTITY) {
      setQuantity(quantity - START_QUANTITY);
      setInputValue(String(quantity - START_QUANTITY));
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < END_QUANTITY) {
      setQuantity(quantity + START_QUANTITY);
      setInputValue(String(quantity + START_QUANTITY));
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
          disabled={quantity === START_QUANTITY}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
        <label className="visually-hidden" htmlFor={`counter${product.id}`}/>
        <input
          type="text"
          id={`counter${product.id}`}
          min={START_QUANTITY}
          max={END_QUANTITY}
          aria-label="количество товара"
          value={inputValue === null ? '' : inputValue}
          onBlur={handleBlur}
          onChange={handleQuantityChange}
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={handleIncreaseQuantity}
          disabled={quantity === END_QUANTITY}
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
