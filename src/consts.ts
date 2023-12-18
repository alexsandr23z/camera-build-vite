export const MAX_COUNT_PRODUCTS = 9;
export const MAX_COUNT_STARS = 5;
export const PAGINATION_PAGES_LENGTH = 3;
export const PRODUCT_SIMILAR_STEP = 3;
export const PRODUCT_SIMILAR_END = 3;
export const PRODUCT_SIMILAR_START = 0;
export const START_SEARCH_FORM = 3;
export const SHOWING_REVIEWS_COUNT = 3;
export const START_QUANTITY = 1;
export const END_QUANTITY = 99;

export enum AppRoute {
  Main = '/',
  Product = '/product',
  Basket = '/basket',
}

export enum ApiRoute {
  Products = '/cameras',
  PromoProducts = '/promo',
  Similar = '/similar',
  Reviews = '/reviews',
  Coupons = '/coupons',
  Orders = '/orders',
}

export const ratingAndTitle = {
  '1': 'terribly',
  '2': 'badly',
  '3': 'normally',
  '4': 'well',
  '5': 'great'
};

export enum ReviewLength {
  Min = 2,
  Max = 160
}

export enum ProductTabsSearch {
  Specifications = '#specifications',
  Description = '#description'
}

export enum SortType {
  NoneType = '',
  SortPrice = 'sortPrice',
  SortPopular = 'sortPopular',
}

export enum SortOrder {
  NoneOrder = '',
  Down = 'down',
  Up = 'up',
}

export enum ProductType {
  Collectible = 'Коллекционная',
  Instant = 'Моментальная',
  Digital = 'Цифровая',
  Film = 'Плёночная'
}

export enum ProductCategory {
  PhotoCamera = 'Фотоаппарат',
  VideoCamera = 'Видеокамера',
}

export enum ProductLevel {
  Zero = 'Нулевой',
  Amateur = 'Любительский',
  Professional = 'Профессиональный'
}

export enum FilterUrl {
  Category = 'category',
  Types = 'types',
  Levels = 'levels',
  Min = 'min',
  Max = 'max'
}

export enum SortUrl {
  SortTypeUrl = 'sortType',
  SortOrderUrl = 'sortOrder',
}

export enum PromoCode {
  PromoOne = 'camera-333',
  PromoTwo = 'camera-444',
  PromoThree = 'camera-555',
}

