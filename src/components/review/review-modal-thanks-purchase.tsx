import React, {useEffect} from 'react';

type TReviewModalThanksPurchaseProps = {
  modalThanksPurchaseActive: boolean;
  setModalThanksPurchaseActive: (arg: boolean) => void;
}

function ReviewModalThanksPurchase({ modalThanksPurchaseActive, setModalThanksPurchaseActive}: TReviewModalThanksPurchaseProps): React.JSX.Element {
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setModalThanksPurchaseActive(false);
      }
    }
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [setModalThanksPurchaseActive]);

  const handleOnClose = () => {
    document.body.style.overflow = 'unset';
    setModalThanksPurchaseActive(false);
  };

  return (
    <div className={modalThanksPurchaseActive ? 'modal is-active modal--narrow' : 'modal'}>
      <div className="modal__wrapper" onClick={(e) => e.stopPropagation()}>
        <div className='modal__overlay' onClick={handleOnClose}/>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg className="modal__icon" width={80} height={78} aria-hidden="true">
            <use xlinkHref="#icon-review-success" />
          </svg>
          <div className="modal__buttons">
            <button onClick={() => {
              document.body.style.overflow = 'unset';
              setModalThanksPurchaseActive(false);
            }}
            className="btn btn--purple modal__btn modal__btn--fit-width"
            type="button"
            >
              Вернуться к покупкам
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleOnClose}>
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewModalThanksPurchase;
