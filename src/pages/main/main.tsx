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
import Filters from '../../components/filters/filters';

function Main(): React.JSX.Element {
  const products = useAppSelector((state) => state.products.products);
  const minProductIndex = useAppSelector((state) => state.pagination.minProductIndex);
  const maxProductIndex = useAppSelector((state) => state.pagination.maxProductIndex);
  const limit = useAppSelector((state) => state.pagination.limit);
  const [showingCards, setShowingCards] = useState<TProduct[]>([]);
  const [sortType, setSortType] = useState<SortType>(SortType.NoneType);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.NoneOrder);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [productsLength, setProductsLength] = useState<number>(products.length);

  const paginationCount: number = Math.ceil(productsLength / limit);

  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleSortChange = useCallback((type: SortType, order: SortOrder) => {
    localStorage.setItem('sortType', type);
    localStorage.setItem('sortOrder', order);
    setSortType(type);
    setSortOrder(order);
    if (type === SortType.NoneType && order === SortOrder.NoneOrder) {
      setShowingCards([...products]);
    } else {
      const sortedProducts = [...products].sort((a, b) => compareFunction(a, b, type, order));
      setShowingCards(sortedProducts);
    }
  }, [products, setShowingCards, setSortType, setSortOrder]);

  const handleCategoryChange = useCallback((category: string | null) => {
    setSelectedTypes([]);
    setSelectedLevels([]);

    setSelectedCategory(category);
    setMinPrice(null);
    setMaxPrice(null);
  }, [setSelectedTypes, setSelectedLevels, setSelectedCategory, setMinPrice, setMaxPrice]);

  const handleTypeChange = useCallback((types: string[]) => {
    setSelectedTypes(types);
    setMinPrice(null);
    setMaxPrice(null);
  }, [setSelectedTypes]);

  const handleLevelChange = useCallback((levels: string[]) => {
    setSelectedLevels(levels);
    setMinPrice(null);
    setMaxPrice(null);
  }, [setSelectedLevels]);

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinPrice = event.target.value !== '' ? Math.max(0, parseInt(event.target.value, 10)) : null;
    setMinPrice(newMinPrice);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxPrice = event.target.value !== '' ? Math.max(0, parseInt(event.target.value, 10)) : null;
    setMaxPrice(newMaxPrice);
  };

  useEffect(() => {
    if (minProductIndex !== null && maxProductIndex && isMountedRef) {
      const filteredProducts = products
        .filter((product) => !selectedCategory || product.category === selectedCategory)
        .filter((product) => selectedTypes.length === 0 || selectedTypes.includes(product.type))
        .filter((product) => selectedLevels.length === 0 || selectedLevels.includes(product.level));

      const filteredByPrice = filteredProducts
        .filter((product) => (minPrice === null || product.price >= minPrice) && (maxPrice === null || product.price <= maxPrice));

      const newPrise = filteredByPrice.map((item) => item.price);
      if(newPrise.length > 0) {
        setMinPrice(Math.min(...newPrise));
        setMaxPrice(Math.max(...newPrise));
      }

      const sortedProducts = [...filteredByPrice].sort((a, b) => compareFunction(a, b, sortType, sortOrder));
      setProductsLength(sortedProducts.length);
      const showingProducts = sortedProducts.slice(minProductIndex, maxProductIndex);
      setShowingCards(showingProducts);

      const currentSearchParams = new URLSearchParams(window.location.search);
      currentSearchParams.set('sortType', sortType);
      currentSearchParams.set('sortOrder', sortOrder);
      window.history.replaceState({}, '', `${window.location.pathname}?${currentSearchParams.toString()}`);
    }
  }, [maxProductIndex, minProductIndex, products, isMountedRef, sortType, sortOrder, selectedCategory, selectedTypes, selectedLevels, minPrice, maxPrice]);

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
                  <Filters
                    onCategoryChange={handleCategoryChange}
                    onTypeChange={handleTypeChange}
                    onLevelChange={handleLevelChange}
                    onMinPriceChange={handleMinPriceChange}
                    onMaxPriceChange={handleMaxPriceChange}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    products={products}
                  />
                </div>
                <div className="catalog__content">
                  <Sorting handleSortChange={handleSortChange} sortType={sortType} setSortType={setSortType} sortOrder={sortOrder} setSortOrder={setSortOrder}/>
                  <div className="cards catalog__cards">
                    {productsLength !== 0 ? showingCards.map((product) => <ProductsCard key={product.id} product={product}/>) : 'по вашему запросу ничего не найдено'}
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
