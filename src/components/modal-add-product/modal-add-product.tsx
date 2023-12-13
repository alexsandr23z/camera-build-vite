import React, {useEffect, useCallback, useRef} from 'react';
import { TProduct } from '../../types/product';
import { collectFocusableElements, formatNumberPrice } from '../../util/util';
import { useAppDispatch } from '../hook';
import { addBasketProduct } from '../../store/slices/products-slices/products-slices';

type TModalAddProductProps = {
  product: TProduct;
  modalAddProductActive: boolean;
  setModalAddProductActive: (arg: boolean) => void;
  setmodalBasketAddProductActive: (arg: boolean) => void;
  onAddToCart: (arg: boolean) => void;
}

function ModalAddProduct({onAddToCart, product, modalAddProductActive, setModalAddProductActive, setmodalBasketAddProductActive}: TModalAddProductProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const {previewImg, previewImg2x, previewImgWebp, previewImgWebp2x,
    price, name, vendorCode, level, type, category} = product;

  const handleAddToCart = () => {
    dispatch(addBasketProduct(product));
    setmodalBasketAddProductActive(true);
    document.body.style.overflow = 'hidden';
    setModalAddProductActive(false);
    onAddToCart(true);
  };

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setModalAddProductActive(false);
      }
    }
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [setModalAddProductActive]);

  const handleOnClose = () => {
    document.body.style.overflow = 'unset';
    setModalAddProductActive(false);
  };

  const refOuter = useRef<HTMLDivElement | null>(null);
  const refFirstFocusable = useRef<HTMLElement | null>(null);
  const refLastFocusable = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const outerElement = refOuter.current;

    if (outerElement) {
      const focusableElements = collectFocusableElements(outerElement);

      refFirstFocusable.current = focusableElements[0] || null;
      refLastFocusable.current = focusableElements[focusableElements.length - 1] || null;

      refFirstFocusable.current?.focus();
    }
  }, [refOuter]);

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
    <div ref={refOuter} onKeyDown={onKeyDown} className={modalAddProductActive ? 'modal is-active' : 'modal'}>
      <div className="modal__wrapper" onClick={(e) => e.stopPropagation()}>
        <div className='modal__overlay' onClick={handleOnClose}/>
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`/${previewImgWebp && previewImgWebp2x} 2x`}
                />
                <img
                  src={`/${previewImg}`}
                  srcSet={`/${previewImg2x} 2x`}
                  width={140}
                  height={120}
                  alt={name}
                />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item">
                  <span className="basket-item__article">Артикул:</span>{''}
                  <span className="basket-item__number">{vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{type} {category}</li>
                <li className="basket-item__list-item">{level} уровень</li>
              </ul>
              <p className="basket-item__price">
                <span className="visually-hidden">Цена:</span>{formatNumberPrice(price)} ₽
              </p>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              tabIndex={0}
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              onClick={handleAddToCart}
            >
              <svg width={24} height={16} aria-hidden={'true'}>
                <use xlinkHref="#icon-add-basket" />
              </svg>
              Добавить в корзину
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" tabIndex={0} onClick={handleOnClose}>
            <svg width={10} height={10} aria-hidden={'true'}>
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAddProduct;
