import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { ReviewLength, ratingAndTitle } from '../../consts';
import { useAppDispatch, useAppSelector } from '../hook';
import { setFormReviewValid, updateAdvantage, updateDisadvantage, updateRating, updateReview, updateUserName } from '../../store/slices/review-slices';
import { submitReview } from '../../store/api-action/review-api';
import { TProduct } from '../../types/product';
import ReviewModalThanksPurchase from './review-modal-thanks-purchase';

type TReviewFormProps = {
  modalReviewFormActive: boolean;
  setModalReviewFormActive: (arg: boolean) => void;
  id: TProduct['id'] | undefined;
}

function ReviewForm({modalReviewFormActive, setModalReviewFormActive, id }: TReviewFormProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.reviews);
  const [modalThanksPurchaseActive, setModalThanksPurchaseActive] = useState(false);

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setModalReviewFormActive(false);
      }
    }
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [setModalReviewFormActive]);

  const handleOnClose = () => {
    document.body.style.overflow = 'unset';
    setModalReviewFormActive(false);
  };

  function handleRatingChange(evt: ChangeEvent<HTMLInputElement>) {
    dispatch(updateRating(Number(evt.target.value)));
  }

  function handleUserNameChange(evt: ChangeEvent<HTMLInputElement>) {
    dispatch(updateUserName(evt.target.value));
  }

  function handleAdvantageChange(evt: ChangeEvent<HTMLInputElement>) {
    dispatch(updateAdvantage(evt.target.value));
  }

  function handleDisadvantageChange(evt: ChangeEvent<HTMLInputElement>) {
    dispatch(updateDisadvantage(evt.target.value));
  }

  function handleReviewChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    dispatch(updateReview(evt.target.value));
  }

  useEffect(() => {
    if (formData.review.length >= ReviewLength.Min && formData.review.length <= ReviewLength.Max &&
       formData.advantage.length >= ReviewLength.Min && formData.advantage.length <= ReviewLength.Max &&
       formData.disadvantage.length >= ReviewLength.Min && formData.disadvantage.length <= ReviewLength.Max &&
       formData.userName.length >= ReviewLength.Min && formData.userName.length <= ReviewLength.Max &&
       formData.rating !== null) {
      dispatch(setFormReviewValid(true));
    } else {
      dispatch(setFormReviewValid(false));
    }
  }, [dispatch, formData]);

  function handleFormSubmit() {
    const { review, rating, userName, advantage, disadvantage } = formData;
    if (id) {
      dispatch(submitReview({
        reviewData: {cameraId: Number(id), review, rating, userName, advantage, disadvantage }
      }));
    }
  }

  return (
    <div className={modalReviewFormActive ? 'modal is-active' : 'modal'}>
      <div className="modal__wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal__overlay" onClick={handleOnClose}/>
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form onSubmit={(evt) => {
              evt.preventDefault();
              handleFormSubmit();
            }}
            >
              <div className="form-review__rate">
                <fieldset className={formData.rating !== null ?
                  'rate form-review__item is-invalid' : 'rate form-review__item'}
                >
                  <legend className="rate__caption">
                    Рейтинг
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">
                      {Object.entries(ratingAndTitle).reverse().map(([rating, title]) => (
                        <Fragment key={rating}>
                          <input
                            className="visually-hidden"
                            name="rate"
                            id={`star-${rating}`}
                            type="radio"
                            value={rating}
                            checked={String(formData.rating) === rating}
                            onChange={handleRatingChange}
                            disabled={formData.isSends}
                          />
                          <label
                            className="rate__label"
                            htmlFor={`star-${rating}`}
                            title={title}
                          />
                        </Fragment>
                      ))}
                    </div>
                    <div className="rate__progress">
                      <span className="rate__stars">{formData.rating}</span> <span>/</span>{}
                      <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  <p className="rate__message">Нужно оценить товар</p>
                </fieldset>
                <div className={formData.userName.length < ReviewLength.Min ?
                  'custom-input form-review__item is-invalid' : 'custom-input form-review__item'}
                >
                  <label>
                    <span className="custom-input__label">
                      Ваше имя
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-name"
                      placeholder="Введите ваше имя"
                      required
                      value={formData.userName}
                      minLength={ReviewLength.Min}
                      maxLength={ReviewLength.Max}
                      onChange={handleUserNameChange}
                      disabled={formData.isSends}
                    />
                  </label>
                  <p className='custom-input__error'>Нужно указать имя
                  </p>
                </div>
                <div className={formData.advantage.length < ReviewLength.Min ?
                  'custom-input form-review__item is-invalid' : 'custom-input form-review__item'}
                >
                  <label>
                    <span className="custom-input__label">
                      Достоинства
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-plus"
                      placeholder="Основные преимущества товара"
                      required
                      value={formData.advantage}
                      minLength={ReviewLength.Min}
                      maxLength={ReviewLength.Max}
                      onChange={handleAdvantageChange}
                      disabled={formData.isSends}
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать достоинства</p>
                </div>
                <div className={formData.disadvantage.length < ReviewLength.Min ?
                  'custom-input form-review__item is-invalid' : 'custom-input form-review__item'}
                >
                  <label>
                    <span className="custom-input__label">
                      Недостатки
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      name="user-minus"
                      placeholder="Главные недостатки товара"
                      required
                      value={formData.disadvantage}
                      minLength={ReviewLength.Min}
                      maxLength={ReviewLength.Max}
                      onChange={handleDisadvantageChange}
                      disabled={formData.isSends}
                    />
                  </label>
                  <p className="custom-input__error">Нужно указать недостатки</p>
                </div>
                <div className={formData.review.length < ReviewLength.Min ?
                  'custom-textarea form-review__item is-invalid' : 'custom-textarea form-review__item'}
                >
                  <label>
                    <span className="custom-textarea__label">
                      Комментарий
                      <svg width={9} height={9} aria-hidden="true">
                        <use xlinkHref="#icon-snowflake" />
                      </svg>
                    </span>
                    <textarea
                      name="user-comment"
                      placeholder="Поделитесь своим опытом покупки"
                      required
                      value={formData.review}
                      minLength={ReviewLength.Min}
                      maxLength={ReviewLength.Max}
                      onChange={handleReviewChange}
                      disabled={formData.isSends}
                    />
                  </label>
                  <div className="custom-textarea__error">
                    Нужно добавить комментарий
                  </div>
                </div>
              </div>
              <button className="btn btn--purple form-review__btn" type="submit" onClick={() => {
                setModalThanksPurchaseActive(true);
                document.body.style.overflow = 'hidden';
              }}
              >
                Отправить отзыв
              </button>
              <ReviewModalThanksPurchase setModalReviewFormActive={setModalReviewFormActive} modalThanksPurchaseActive={modalThanksPurchaseActive} setModalThanksPurchaseActive={setModalThanksPurchaseActive}/>
            </form>
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

export default ReviewForm;
