import React from 'react';
import { showActiveRateng, showDisabledRateng } from '../../util/util';

type TRatingProps = {
  rating: number;
  reviewCount: number;
}

function Rating({rating, reviewCount}: TRatingProps): React.JSX.Element {
  const activeRatingStar = showActiveRateng(rating);
  const disabledRatingStar = showDisabledRateng(rating);

  return (
    <div className="rate product__rate">
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
      <p className="visually-hidden">Рейтинг: {rating}</p>
      <p className="rate__count">
        <span className="visually-hidden">Всего оценок:</span>{reviewCount}
      </p>
    </div>
  );
}

export default Rating;

