import React, { useEffect, useCallback, useRef } from 'react';
import { TProduct } from '../../types/product';
import { collectFocusableElements } from '../../util/util';
import { AppRoute } from '../../consts';
import {Link} from 'react-router-dom';
import { useAppDispatch } from '../hook';
import { removeBasketProduct, toggleAddedToCart } from '../../store/slices/products-slices/products-slices';

type TModalBasketRemoveProductProps = {
  product: TProduct | null;
  modalBasketRemoveProductActive: boolean;
  setModalBasketRemoveProductActive: (arg: boolean) => void;
  setQuantity: (arg: number) => void;
}

function ModalBasketRemoveProduct({ product, modalBasketRemoveProductActive, setModalBasketRemoveProductActive, setQuantity }: TModalBasketRemoveProductProps): React.JSX.Element {
  const dispatch = useAppDispatch();

  const handleRemoveProduct = () => {
    if (product) {
      dispatch(removeBasketProduct(Number(product.id)));
      dispatch(toggleAddedToCart({ productId: product.id as string, added: false }));
    }
    setQuantity(1);
    setModalBasketRemoveProductActive(false);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setModalBasketRemoveProductActive(false);
      }
    }
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [setModalBasketRemoveProductActive]);

  const handleOnClose = () => {
    document.body.style.overflow = 'unset';
    setModalBasketRemoveProductActive(false);
  };

  const refOuter = useRef<HTMLDivElement | null>(null);
  const refFirstFocusable = useRef<HTMLElement | null>(null);
  const refLastFocusable = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if(refOuter &&
      refFirstFocusable &&
      refLastFocusable) {
      const outerElement = refOuter.current;
      const focusableElements = collectFocusableElements(outerElement);

      refFirstFocusable.current = focusableElements[0] || null;
      refLastFocusable.current = focusableElements[focusableElements.length - 1] || null;

      refFirstFocusable.current?.focus();
    }
  }, [refOuter, refFirstFocusable, refLastFocusable]);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {

    if (
      document.activeElement === refLastFocusable.current &&
      e.key === 'Tab' &&
      !e.shiftKey
    ) {
      e.preventDefault();
      refFirstFocusable.current?.focus();
    }
    if (
      document.activeElement === refFirstFocusable.current &&
      e.key === 'Tab' &&
      e.shiftKey
    ) {
      e.preventDefault();
      refLastFocusable.current?.focus();
    }
  }, []);

  return (
    <div ref={refOuter} onKeyDown={onKeyDown} className={modalBasketRemoveProductActive ? 'modal is-active' : 'modal'}>
      <div className="modal__wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal__overlay" onClick={handleOnClose}/>
        <div className="modal__content">
          <p className="title title--h4">Удалить этот товар?</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source
                  type="image/webp"
                  srcSet={product?.previewImgWebp && product?.previewImgWebp2x}
                />
                <img
                  src={product?.previewImg}
                  srcSet={product?.previewImg2x}
                  width={140}
                  height={120}
                  alt={product?.name}
                />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{product?.name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item">
                  <span className="basket-item__article">Артикул:</span>{''}
                  <span className="basket-item__number">{product?.vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{product?.type} {product?.category}</li>
                <li className="basket-item__list-item">{product?.level} уровень</li>
              </ul>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--half-width"
              type="button"
              tabIndex={0}
              onClick={handleRemoveProduct}
            >
              Удалить
            </button>
            <Link
              className="btn btn--transparent modal__btn modal__btn--half-width"
              to={AppRoute.Main}
              tabIndex={0}
            >
              Продолжить покупки
            </Link>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" tabIndex={0} onClick={handleOnClose}>
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>

  );
}

export default ModalBasketRemoveProduct;

