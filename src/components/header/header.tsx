import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, START_SEARCH_FORM } from '../../consts';
import { useAppSelector } from '../hook';
import { TProduct } from '../../types/product';

function Header(): React.JSX.Element {
  const products = useAppSelector((state) => state.products.products);
  const [value, setValue] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const activeItemRef = useRef<HTMLLIElement | null>(null);
  const filteredProductsRef = useRef(filteredProducts);

  useEffect(() => {
    if (listRef.current && selectedItemIndex !== null) {
      const focusedItem = listRef.current.querySelector('.form-search__select-item.focus');
      if (focusedItem) {
        const listRect = listRef.current.getBoundingClientRect();
        const itemRect = focusedItem.getBoundingClientRect();

        if (itemRect.bottom > listRect.bottom) {
          listRef.current.scrollTop += itemRect.bottom - listRect.bottom;
        } else if (itemRect.top < listRect.top) {
          listRef.current.scrollTop -= listRect.top - itemRect.top;
        }
      }
    }
  }, [selectedItemIndex]);

  const handleFormSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = evt.target.value;
    setValue(inputValue);

    if (inputValue.length >= START_SEARCH_FORM) {
      const resultProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(inputValue.toLowerCase())
      );

      setFilteredProducts(resultProducts);
      setIsOpen(true);
    } else {
      setFilteredProducts([]);
      setIsOpen(false);
    }
  };

  const handleSearchProductsClick = (selectedProduct: TProduct | null) => {
    if (selectedProduct) {
      navigate(`${AppRoute.Product}/${selectedProduct.id}`);
    }

    setIsOpen(false);
  };

  const updateActiveItem = (index: number) => {
    if (listRef.current && listRef.current.children[index]) {
      activeItemRef.current = listRef.current.children[index] as HTMLLIElement;
      return index;
    }
    return selectedItemIndex;
  };

  const handleArrowDown = () => {
    setSelectedItemIndex((prevIndex) => {
      const newIndex = (prevIndex === null || prevIndex === filteredProducts.length - 1) ? 0 : prevIndex + 1;
      return updateActiveItem(newIndex);
    });
  };

  const handleArrowUp = () => {
    setSelectedItemIndex((prevIndex) => {
      const newIndex = (prevIndex === null || prevIndex === 0) ? filteredProducts.length - 1 : prevIndex - 1;
      return updateActiveItem(newIndex);
    });
  };

  const handleFormSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' && filteredProducts.length > 0) {
      e.preventDefault();
      handleArrowDown();
    } else if (e.key === 'ArrowUp' && filteredProducts.length > 0) {
      e.preventDefault();
      handleArrowUp();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (e.shiftKey) {
        setSelectedItemIndex((prevIndex) =>
          prevIndex !== null ? Math.max(prevIndex - 1, 0) : 0
        );
      } else {
        setSelectedItemIndex((prevIndex) =>
          prevIndex !== null ? Math.min(prevIndex + 1, filteredProducts.length - 1) : 0
        );
      }
    }
  };

  const handleListItemKeyDown = (e: React.KeyboardEvent<HTMLLIElement>, index: number) => {
    if (e.key === 'Enter' && filteredProducts[index]) {
      const selectedProduct = filteredProducts[index];
      handleSearchProductsClick(selectedProduct);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleArrowDown();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleArrowUp();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (e.shiftKey) {
        setSelectedItemIndex((prevIndex) =>
          prevIndex !== null ? Math.max(prevIndex - 1, 0) : 0
        );
      } else {
        setSelectedItemIndex((prevIndex) =>
          prevIndex !== null ? Math.min(prevIndex + 1, filteredProducts.length - 1) : 0
        );
      }
    }
  };

  useEffect(() => {
    filteredProductsRef.current = filteredProducts;
  }, [filteredProducts]);

  useEffect(() => {
    const selectedProduct =
      selectedItemIndex !== null ? filteredProductsRef.current[selectedItemIndex] : null;
    setValue(selectedProduct ? selectedProduct.name : '');
  }, [selectedItemIndex]);

  const handleReset = () => {
    setIsOpen(false);
    setFilteredProducts([]);
    setValue('');
    setSelectedItemIndex(null);
  };

  return (
    <header className="header" id="header">
      <div className="container">
        <Link
          className="header__logo"
          to={AppRoute.Main}
          aria-label="Переход на главную"
        >
          <svg width={100} height={36} aria-hidden="true">
            <use xlinkHref="#icon-logo" />
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.Main}>
                Каталог
              </Link>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Гарантии
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Доставка
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                О компании
              </a>
            </li>
          </ul>
        </nav>
        <div className={value.length >= START_SEARCH_FORM && isOpen ? 'form-search list-opened' : 'form-search'}>
          <form>
            <label>
              <svg
                className="form-search__icon"
                width={16}
                height={16}
                aria-hidden="true"
              >
                <use xlinkHref="#icon-lens" />
              </svg>
              <input
                className="form-search__input"
                type="text"
                autoComplete="off"
                name="form-search__input"
                value={value}
                placeholder="Поиск по сайту"
                onChange={handleFormSearchChange}
                onKeyDown={handleFormSearchKeyDown}
              />
            </label>
            <ul
              ref={listRef}
              className="form-search__select-list"
            >
              {filteredProducts.map((product, index) => (
                <li
                  key={product.id}
                  className={`form-search__select-item ${index === selectedItemIndex ? 'focus' : ''}`}
                  tabIndex={0}
                  onClick={() => handleSearchProductsClick(product)}
                  onKeyDown={(e) => handleListItemKeyDown(e, index)}
                  ref={(e) => {
                    if (index === selectedItemIndex && e) {
                      activeItemRef.current = e;
                      e.focus();
                    }
                  }}
                >
                  {product.name}
                </li>
              ))}
            </ul>
          </form>
          <button className="form-search__reset" type="reset" onClick={handleReset}>
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
            <span className="visually-hidden">Сбросить поиск</span>
          </button>
        </div>
        <a className="header__basket-link" href="#">
          <svg width={16} height={16} aria-hidden="true">
            <use xlinkHref="#icon-basket" />
          </svg>
        </a>
      </div>
    </header>
  );
}

export default Header;
