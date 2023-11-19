import { MAX_COUNT_STARS } from '../consts';
import { TProducts } from '../types/product';

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

export function sortLowToHighRating(products: TProducts) {
  return [...products].sort((a, b) => a.rating - b.rating);
}

export function sortHighToLowRating(products: TProducts) {
  return [...products].sort((a, b) => b.rating - a.rating);
}

export function sortLowToHighPrice(products: TProducts) {
  return [...products].sort((a, b) => a.price - b.price);
}

export function sortHighToLowPrice(products: TProducts) {
  return [...products].sort((a, b) => b.price - a.price);
}

