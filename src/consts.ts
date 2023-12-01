export const MAX_COUNT_PRODUCTS = 9;
export const MAX_COUNT_STARS = 5;
export const PAGINATION_PAGES_LENGTH = 3;
export const PRODUCT_SIMILAR_STEP = 3;
export const PRODUCT_SIMILAR_END = 3;
export const PRODUCT_SIMILAR_START = 0;
export const START_SEARCH_FORM = 3;

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
  NoneType = 'noneType',
  SortPrice = 'sortPrice',
  SortPopular = 'sortPopular',
}

export enum SortOrder {
  NoneOrder = 'noneOrder',
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

export const FilterCategory = {
  PhotoCamera: 'Фотоаппарат',
  VideoCamera: 'Видеокамера',
} as const;

export const FilterType = {
  Digital: 'Цифровая',
  Film: 'Плёночная',
  Snapshot: 'Моментальная',
  Collection: 'Коллекционная',
} as const;

export const FilterLevel = {
  Zero: 'Нулевой',
  NonProfessional: 'Любительский',
  Professional: 'Профессиональный',
} as const;

export const FilterPrise = {
  price: 'от',
  priceUp: 'до',
} as const;

