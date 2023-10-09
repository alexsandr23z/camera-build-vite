export enum AppRoute {
  Main = '/',
  Product = '/product',
  Basket = '/basket',
}

export enum ProductType {
  Collectible = 'Коллекционная',
  Instant = 'Моментальная',
  Digital = 'Цифровая',
  Film = 'Плёночная'
}

export enum ProductCategory {
  VideoCamera = 'Видеокамера',
  Camera = 'Фотоаппарат'
}

export enum ProductLevel {
  Zero = ' Нулевой',
  Amateur = 'Любительский',
  Professional = 'Профессиональный'
}

export enum ApiRoute {
  Products = '/cameras',
}

export const MIN_COUNT_PRODUCTS = 0;
export const MAX_COUNT_PRODUCTS = 9;
export const MAX_COUNT_STARS = 5;
