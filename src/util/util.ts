import { MAX_COUNT_STARS, SortOrder, SortType } from '../consts';
import { TProduct, TProductBasket } from '../types/product';

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

export function compareFunction(a: TProduct, b: TProduct, sortType: SortType, sortOrder: SortOrder) {
  if (sortType === SortType.SortPrice) {
    return sortOrder === SortOrder.Up ? a.price - b.price : b.price - a.price;
  } else if (sortType === SortType.SortPopular) {
    return sortOrder === SortOrder.Up ? a.rating - b.rating : b.rating - a.rating;
  }
  return 0;
}

export const collectFocusableElements = (element: HTMLElement | null) => {
  const focusableElements: HTMLElement[] = [];

  const collect = (el: HTMLElement | null) => {
    if (el && el.getAttribute('tabindex')) {
      focusableElements.push(el);
    }

    for (const child of Array.from(el?.children || [])) {
      collect(child as HTMLElement);
    }
  };

  collect(element);

  return focusableElements;
};

export const formatNumberPrice = (prece: number) => prece.toLocaleString('fr-FR').replace(/,/g, ' ');

export const loadBasketFromLocalStorage = (): TProductBasket[] => {
  try {
    const serializedBasket = localStorage.getItem('basket');
    if (serializedBasket === null) {
      return [];
    }
    return JSON.parse(serializedBasket) as TProductBasket[];
  } catch (err) {
    return [];
  }
};

export function calculateTotalQuantityExcludingIds(productQuantities: { [key: string]: number | unknown[] } | undefined): number {
  if (!productQuantities) {
    return 0;
  }

  const validKeys = Object.keys(productQuantities).filter(
    (key) => !isNaN(Number(key)) && !Array.isArray(productQuantities[key])
  );

  return validKeys.reduce((total, key) => {
    const value = productQuantities[key];

    if (typeof value === 'number') {
      return total + value;
    } else {
      return total;
    }
  }, 0);
}
