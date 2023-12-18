import React, {useEffect, useRef, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import { AppRoute } from '../../consts';
import { collectFocusableElements } from '../../util/util';

type TModalBasketProductSuccessProps = {
  modalBasketProductNoSuccessActive: boolean;
  setModalBasketProductNoSuccessActive: (arg: boolean) => void;
}

function ModalBasketProductNoSuccess({modalBasketProductNoSuccessActive, setModalBasketProductNoSuccessActive}: TModalBasketProductSuccessProps): React.JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setModalBasketProductNoSuccessActive(false);
      }
    }
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [setModalBasketProductNoSuccessActive]);

  const handleOnClose = () => {
    document.body.style.overflow = 'unset';
    setModalBasketProductNoSuccessActive(false);
  };

  const handleOnCloseCatalog = () => {
    document.body.style.overflow = 'unset';
    setModalBasketProductNoSuccessActive(false);
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
    <div ref={refOuter} onKeyDown={onKeyDown} className={modalBasketProductNoSuccessActive ? 'modal is-active modal--narrow' : 'modal modal--narrow'}>
      <div className="modal__wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal__overlay" onClick={handleOnClose}/>
        <div className="modal__content">
          <p className="title title--h4">Произошла ошибка.</p>
          <svg className="modal__icon" width={80} height={78} aria-hidden="true">
            <use xlinkHref="#icon-review-success" />
          </svg>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              tabIndex={0} onClick={handleOnCloseCatalog}
            >
              Вернуться к покупкам
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

export default ModalBasketProductNoSuccess;
