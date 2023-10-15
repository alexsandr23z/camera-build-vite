import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hook';
import { fetchProduct } from '../../store/api-action/product-api';
import { dropProduct } from '../../store/slices/product-slices';
import { showActiveRateng, showDisabledRateng } from '../../util/util';

function ProductCardInfo(): React.JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.product);

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct({ id }));
    }

    return () => {
      dispatch(dropProduct());
    };
  }, [dispatch, id]);

  if(!product || !id) {
    return (
      <div></div>
    );
  }

  const {previewImg, previewImg2x, previewImgWebp, previewImgWebp2x,
    price, name, vendorCode, type, category, description,
    level, rating, reviewCount} = product;

  const activeRatingStar = showActiveRateng(rating);
  const disabledRatingStar = showDisabledRateng(rating);

  return (
    <div className="container">
      <div className="product__img">
        <picture>
          <source
            type="image/webp"
            srcSet={previewImgWebp && previewImgWebp2x}
          />
          <img
            src={previewImg}
            srcSet={previewImg2x}
            width={560}
            height={480}
            alt={name}
          />
        </picture>
      </div>
      <div className="product__content">
        <h1 className="title title--h3">{name}</h1>
        <div className="rate product__rate">
          { activeRatingStar.map((index) => (
            <svg key={index} width={17} height={16} aria-hidden="true">
              <use xlinkHref="#icon-full-star" />
            </svg>)
          )}
          { disabledRatingStar.map((index) => (
            <svg key={index} width={17} height={16} aria-hidden="true">
              <use xlinkHref="#icon-star" />
            </svg>)
          )}
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{reviewCount}
          </p>
        </div>
        <p className="product__price">
          <span className="visually-hidden">Цена:</span>{`${price}₽`}
        </p>
        <button className="btn btn--purple" type="button">
          <svg width={24} height={16} aria-hidden="true">
            <use xlinkHref="#icon-add-basket" />
          </svg>
          Добавить в корзину
        </button>
        <div className="tabs product__tabs">
          <div className="tabs__controls product__tabs-controls">
            <button className="tabs__control" type="button">
              Характеристики
            </button>
            <button className="tabs__control is-active" type="button">
              Описание
            </button>
          </div>
          <div className="tabs__content">
            <div className="tabs__element">
              <ul className="product__tabs-list">
                <li className="item-list">
                  <span className="item-list__title">Артикул:</span>
                  <p className="item-list__text"> {vendorCode}</p>
                </li>
                <li className="item-list">
                  <span className="item-list__title">Категория:</span>
                  <p className="item-list__text">{category}</p>
                </li>
                <li className="item-list">
                  <span className="item-list__title">Тип камеры:</span>
                  <p className="item-list__text">{type}</p>
                </li>
                <li className="item-list">
                  <span className="item-list__title">Уровень:</span>
                  <p className="item-list__text">{level}</p>
                </li>
              </ul>
            </div>
            <div className="tabs__element is-active">
              <div className="product__tabs-text">
                <p>
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCardInfo;
