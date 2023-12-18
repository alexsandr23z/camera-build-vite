import React, {useEffect, useCallback, useRef} from 'react';
import { collectFocusableElements } from '../../util/util';
import {useNavigate} from 'react-router-dom';
import { AppRoute } from '../../consts';

type TModalBasketAddProductProps = {
  modalBasketAddProductActive: boolean;
  setmodalBasketAddProductActive: (arg: boolean) => void;
}

function ModalBasketAddProduct({modalBasketAddProductActive, setmodalBasketAddProductActive}: TModalBasketAddProductProps): React.JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setmodalBasketAddProductActive(false);
      }
    }
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [setmodalBasketAddProductActive]);

  const handleOnClose = () => {
    document.body.style.overflow = 'unset';
    setmodalBasketAddProductActive(false);
  };

  const handleOnCloseBasket = () => {
    document.body.style.overflow = 'unset';
    setmodalBasketAddProductActive(false);
    navigate(AppRoute.Basket);
  };

  const handleOnCloseCatalog = () => {
    document.body.style.overflow = 'unset';
    setmodalBasketAddProductActive(false);
    navigate(AppRoute.Main);
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
    <div ref={refOuter} onKeyDown={onKeyDown} className={modalBasketAddProductActive ? 'modal is-active modal--narrow' : 'modal modal--narrow'}>
      <div className="modal__wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal__overlay" onClick={handleOnClose}/>
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width={86} height={80} aria-hidden="true">
            <use xlinkHref="#icon-success" />
          </svg>
          <div className="modal__buttons">
            <button className="btn btn--transparent modal__btn" tabIndex={0} onClick={handleOnCloseCatalog}>
              Продолжить покупки
            </button>
            <button className="btn btn--purple modal__btn modal__btn--fit-width" tabIndex={0} onClick={handleOnCloseBasket}>
              Перейти в корзину
            </button>
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

export default ModalBasketAddProduct;

