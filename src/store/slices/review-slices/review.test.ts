import { reviewMocks, reviewsMocks } from '../../../mocks/mocks';
import { fetchReviews } from '../../api-action/review-api/review-api';
import reviewSlices from './review-slices';
import reviewsReducer, {
  addReview,
  updateAdvantage,
} from './review-slices';

describe('Reviews Reducer', () => {
  it('should handle addReview', () => {
    const initialState = {
      reviews: [],
      userName: '',
      advantage: '',
      disadvantage: '',
      review: '',
      rating: 0,
      isValid: false,
      isSends: false,
      cameraId: null,
    };

    const payload = reviewMocks;
    const nextState = reviewsReducer(initialState, addReview(payload));
    expect(nextState.reviews).toEqual([...initialState.reviews, payload]);
  });

  it('should handle updateAdvantage', () => {
    const initialState = {
      reviews: [],
      userName: '',
      advantage: '',
      disadvantage: '',
      review: '',
      rating: 0,
      isValid: false,
      isSends: false,
      cameraId: null,
    };

    const payload = 'some advantage text';
    const nextState = reviewsReducer(initialState, updateAdvantage(payload));
    expect(nextState.advantage).toEqual(payload);
  });

  it('should handle fetchReviews.fulfilled', () => {
    const initialState = {
      reviews: [],
      userName: '',
      advantage: '',
      disadvantage: '',
      review: '',
      rating: 0,
      isValid: false,
      isSends: false,
      cameraId: null,
    };

    const payload = reviewsMocks;
    const nextState = reviewSlices(initialState, { type: fetchReviews.fulfilled.type, payload });
    expect(nextState).toEqual({
      reviews: payload,
      userName: '',
      advantage: '',
      disadvantage: '',
      review: '',
      rating: 0,
      isValid: false,
      isSends: false,
      cameraId: null,
    });
  });
});
