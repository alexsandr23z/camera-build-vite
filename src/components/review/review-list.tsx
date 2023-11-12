import React from 'react';
import { TReview } from '../../types/review';
import { showActiveRateng, showDisabledRateng } from '../../util/util';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

type TReviewListProps = {
  reviewId: TReview;
}

function ReviewList({ reviewId }: TReviewListProps): React.JSX.Element {
  const {createAt, userName, advantage, disadvantage, review, rating} = reviewId;

  const activeRatingStar = showActiveRateng(rating);
  const disabledRatingStar = showDisabledRateng(rating);

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime={createAt}>
          {dayjs(createAt).locale('ru').format('D MMMM')}
        </time>
      </div>
      <div className="rate review-card__rate">
        {activeRatingStar.map((index) => (
          <svg key={index} width={17} height={16} aria-hidden="true">
            <use xlinkHref="#icon-full-star" />
          </svg>)
        )}
        {disabledRatingStar.map((index) => (
          <svg key={index} width={17} height={16} aria-hidden="true">
            <use xlinkHref="#icon-star" />
          </svg>)
        )}
        <p className="visually-hidden">Оценка: {rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list">
          <span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">
            {advantage}
          </p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">
            {disadvantage}
          </p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">
            {review}
          </p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewList;
