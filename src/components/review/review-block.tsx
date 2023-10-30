import React, {useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../hook';
import { fetchReviews } from '../../store/api-action/review-api';
import ReviewList from './review-list';

type TReviewBlockProps = {
  id: string | undefined;
}

function ReviewBlock({id}: TReviewBlockProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => state.reviews.reviews);
  const sortReview = [...reviews].sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());

  useEffect(() => {
    if(id) {
      dispatch(fetchReviews({id}));
    }
  }, [dispatch, id]);

  const handleReviewClick = () => {
    console.log(sortReview);
  };

  return (
    <div className="container">
      <div className="page-content__headed">
        <h2 className="title title--h3">Отзывы</h2>
        <button className="btn" type="button">
          Оставить свой отзыв
        </button>
      </div>
      <ul className="review-block__list">
        {sortReview.slice(0, 3).map((reviewId) => <ReviewList key={reviewId.id} reviewId={reviewId}/>)}
      </ul>
      <div className="review-block__buttons">
        <button className="btn btn--purple" type="button" onClick={handleReviewClick}>
          Показать больше отзывов
        </button>
      </div>
    </div>
  );
}

export default ReviewBlock;
