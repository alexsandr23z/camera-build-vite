import React, {useEffect, useState, useRef, useCallback} from 'react';
import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useAppSelector } from '../../components/hook';
import ProductsCard from '../../components/products-card/products-card';
import SwiperSlides from '../../components/swiper-slide/swiper-slide';
import Pagination from '../../components/pagination/pagination';
import { TProduct } from '../../types/product';
import Sorting from '../../components/sorting/sorting';
import { SortOrder, SortType } from '../../consts';
import { compareFunction} from '../../util/util';

function Main(): React.JSX.Element {
  const products = useAppSelector((state) => state.products.products);
  const minProductIndex = useAppSelector((state) => state.pagination.minProductIndex);
  const maxProductIndex = useAppSelector((state) => state.pagination.maxProductIndex);
  const limit = useAppSelector((state) => state.pagination.limit);
  const [showingCards, setShowingCards] = useState<TProduct[]>([]);
  const [sortType, setSortType] = useState<SortType>(SortType.NoneType);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.NoneOrder);

  const productsLength = products.length;
  const paginationCount: number = Math.ceil(productsLength / limit);

  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleSortChange = useCallback((type: SortType, order: SortOrder) => {
    sessionStorage.setItem('sortType', type);
    sessionStorage.setItem('sortOrder', order);
    setSortType(type);
    setSortOrder(order);
    if (type === SortType.NoneType && order === SortOrder.NoneOrder) {
      setShowingCards([...products]);
    } else {
      const sortedProducts = [...products].sort((a, b) => compareFunction(a, b, type, order));
      setShowingCards(sortedProducts);
    }
  }, [products, setShowingCards, setSortType, setSortOrder]);

  useEffect(() => {
    if(minProductIndex !== null && maxProductIndex && isMountedRef) {
      const sortedProducts = [...products].sort((a, b) => compareFunction(a, b, sortType, sortOrder));
      const showingProducts = sortedProducts.slice(minProductIndex, maxProductIndex);
      setShowingCards(showingProducts);
    }
  }, [maxProductIndex, minProductIndex, products, isMountedRef, sortType, sortOrder]);

  return (
    <div className="wrapper">
      <Helmet>
        <title>Фотошоп</title>
      </Helmet>
      <Header/>
      <main>
        <SwiperSlides/>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="index.html">
                    Главная
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini" />
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">
                    Каталог
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <div className="catalog-filter">
                    <form action="#">
                      <h2 className="visually-hidden">Фильтр</h2>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Цена, ₽</legend>
                        <div className="catalog-filter__price-range">
                          <div className="custom-input">
                            <label>
                              <input type="number" name="price" placeholder="от" />
                            </label>
                          </div>
                          <div className="custom-input">
                            <label>
                              <input
                                type="number"
                                name="priceUp"
                                placeholder="до"
                              />
                            </label>
                          </div>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Категория</legend>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input
                              type="checkbox"
                              name="photocamera"
                            />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                              Фотокамера
                            </span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="videocamera" />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                              Видеокамера
                            </span>
                          </label>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Тип камеры</legend>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input
                              type="checkbox"
                              name="digital"
                            />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">Цифровая</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="film"/>
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                              Плёночная
                            </span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="snapshot" />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                              Моментальная
                            </span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input
                              type="checkbox"
                              name="collection"
                            />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                              Коллекционная
                            </span>
                          </label>
                        </div>
                      </fieldset>
                      <fieldset className="catalog-filter__block">
                        <legend className="title title--h5">Уровень</legend>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="zero"/>
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">Нулевой</span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="non-professional" />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                              Любительский
                            </span>
                          </label>
                        </div>
                        <div className="custom-checkbox catalog-filter__item">
                          <label>
                            <input type="checkbox" name="professional" />
                            <span className="custom-checkbox__icon" />
                            <span className="custom-checkbox__label">
                              Профессиональный
                            </span>
                          </label>
                        </div>
                      </fieldset>
                      <button
                        className="btn catalog-filter__reset-btn"
                        type="reset"
                      >
                        Сбросить фильтры
                      </button>
                    </form>
                  </div>
                </div>
                <div className="catalog__content">
                  <Sorting handleSortChange={handleSortChange} sortType={sortType} setSortType={setSortType} sortOrder={sortOrder} setSortOrder={setSortOrder}/>
                  <div className="cards catalog__cards">
                    {showingCards.map((product) => <ProductsCard key={product.id} product={product}/>)}
                  </div>
                  <Pagination paginationCount={paginationCount} productsLength={productsLength}/>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default Main;
