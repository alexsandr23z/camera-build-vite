import React, {useEffect, useState} from 'react';
import { useAppDispatch, useAppSelector } from '../hook';
import { fetchReviews } from '../../store/api-action/review-api/review-api';
import ReviewList from './review-list';
import ReviewForm from './review-form';
import ReviewModalThanksPurchase from './review-modal-thanks-purchase';
import { SHOWING_REVIEWS_COUNT } from '../../consts';


type TReviewBlockProps = {
  id: string | undefined;
}

function ReviewBlock({id}: TReviewBlockProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => state.reviews.reviews);
  const sortReview = [...reviews].sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());
  const [modalReviewFormActive, setModalReviewFormActive] = useState(false);
  const [showingReviews, setShowingReviews] = useState(SHOWING_REVIEWS_COUNT);
  const [modalThanksPurchaseActive, setModalThanksPurchaseActive] = useState(false);
  const reviewsLength = sortReview.length;

  useEffect(() => {
    if(id) {
      dispatch(fetchReviews({id}));
    }
  }, [dispatch, id]);

  const handleReviewClick = () => {
    setShowingReviews(showingReviews + SHOWING_REVIEWS_COUNT);
  };

  return (
    <div className="container">
      <div className="page-content__headed">
        <h2 className="title title--h3">Отзывы</h2>
        <button className="btn" type="button" onClick={() => {
          document.body.style.overflow = 'hidden';
          setModalReviewFormActive(true);
        }}
        >
          Оставить свой отзыв
        </button>
        <ReviewForm id={id} modalReviewFormActive={modalReviewFormActive} setModalReviewFormActive={setModalReviewFormActive} setModalThanksPurchaseActive={setModalThanksPurchaseActive}/>
      </div>
      <ReviewModalThanksPurchase modalThanksPurchaseActive={modalThanksPurchaseActive} setModalThanksPurchaseActive={setModalThanksPurchaseActive}/>
      <ul className="review-block__list">
        {sortReview.slice(0, showingReviews).map((reviewId) => <ReviewList key={reviewId.id} reviewId={reviewId}/>)}
      </ul>
      <div className="review-block__buttons">
        {reviewsLength > showingReviews &&
          <button className="btn btn--purple" type="button" onClick={handleReviewClick}>
            Показать больше отзывов
          </button>}
      </div>
    </div>
  );
}

export default ReviewBlock;
