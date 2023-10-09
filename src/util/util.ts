import { MAX_COUNT_STARS } from '../consts';

export const showActiveRateng = (rating: number) => {
  const activeRating = [];
  for (let index = 1; index <= rating; index++) {
    activeRating.push(index);
  }
  return activeRating;
};

export const showDisabledRateng = (rating: number) => {
  const disabledRating = MAX_COUNT_STARS - rating;
  const newDisabledRating = [];
  for (let index = 1; index <= disabledRating; index++) {
    newDisabledRating.push(index);
  }
  return newDisabledRating;
};

