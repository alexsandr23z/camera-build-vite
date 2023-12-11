import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute, START_SEARCH_FORM } from '../../consts';
import { useAppSelector } from '../hook';
import { TProduct } from '../../types/product';
import Styles from './form-search.module.css';

function FormSearch(): React.JSX.Element {
  const products = useAppSelector((state) => state.products.products);
  const [value, setValue] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<TProduct[]>([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const activeItemRef = useRef<HTMLLIElement | null>(null);
  const filteredProductsRef = useRef(filteredProducts);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const firstItemRef = useRef<HTMLLIElement | null>(null);

  const handleFormSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = evt.target.value;
    setValue(inputValue);

    if (inputValue.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }

    if (inputValue.length >= START_SEARCH_FORM) {
      const resultProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(inputValue.toLowerCase())
      );

      setFilteredProducts(resultProducts);
    } else {
      setFilteredProducts([]);
    }
  };

  const handleSearchProductsClick = (selectedProduct: TProduct | null) => {
    if (selectedProduct) {
      navigate(`${AppRoute.Product}/${selectedProduct.id}`);
    }

    setIsOpen(false);
  };

  const updateActiveItem = useCallback((index: number) => {
    if (listRef.current && listRef.current.children[index]) {
      activeItemRef.current = listRef.current.children[index] as HTMLLIElement;
      activeItemRef.current.focus();
      return index;
    }
    return selectedItemIndex;
  }, [selectedItemIndex]);

  const handleArrowDown = () => {
    setIsOpen(true);
    setSelectedItemIndex((prevIndex) => {
      const newIndex = (prevIndex === null || prevIndex === filteredProducts.length - 1) ? 0 : prevIndex + 1;
      updateActiveItem(newIndex);
      return newIndex;
    });
  };

  const handleArrowUp = () => {
    setIsOpen(true);
    setSelectedItemIndex((prevIndex) => {
      const newIndex = (prevIndex === null || prevIndex === 0) ? filteredProducts.length - 1 : prevIndex - 1;
      updateActiveItem(newIndex);
      return newIndex;
    });
  };

  const handleFormSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' && filteredProducts.length > 0) {
      e.preventDefault();
      handleArrowDown();
    } else if (e.key === 'ArrowUp' && filteredProducts.length > 0) {
      e.preventDefault();
      handleArrowUp();
    } else if (e.key === 'Tab' && filteredProducts.length > 0) {
      e.preventDefault();
      if (isOpen) {
        handleArrowDown();
      }
      setIsOpen(true);
    }
  };

  const handleListItemKeyDown = (e: React.KeyboardEvent<HTMLLIElement>, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
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
      if (isOpen) {
        handleArrowDown();
      }
    } else {
      setIsOpen(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  useEffect(() => {
    filteredProductsRef.current = filteredProducts;
  }, [filteredProducts]);

  const handleReset = () => {
    setIsOpen(false);
    setFilteredProducts([]);
    setValue('');
    setSelectedItemIndex(null);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    const handleListKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace' && e.currentTarget === listRef.current) {
        e.preventDefault();
        const newValue = value.slice(0, -1);
        setValue(newValue);
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.setSelectionRange(newValue.length, newValue.length);
        }

        const resultProducts = products.filter(
          (product) =>
            product.name.toLowerCase().includes(newValue.toLowerCase())
        );

        setFilteredProducts(resultProducts);
        setIsOpen(true);
        setSelectedItemIndex(resultProducts.length > 0 ? 0 : null);
      }
    };

    const listRefCurrent = listRef.current;

    if (listRefCurrent) {
      listRefCurrent.addEventListener('keydown', handleListKeyDown);
    }

    return () => {
      if (listRefCurrent) {
        listRefCurrent.removeEventListener('keydown', handleListKeyDown);
      }
    };
  }, [value, products, updateActiveItem]);

  return (
    <div className={isOpen ? 'form-search list-opened' : 'form-search'}>
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
            ref={inputRef}
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
        {filteredProducts[0] !== undefined &&
          <ul
            ref={listRef}
            className="form-search__select-list"
          >
            {filteredProducts.map((product, index) => (
              <li
                key={product.id}
                className={`form-search__select-item ${index === selectedItemIndex ? Styles.focus : ''}`}
                tabIndex={0}
                onClick={() => handleSearchProductsClick(product)}
                onKeyDown={(e) => handleListItemKeyDown(e, index)}
                ref={(e) => {
                  if (index === selectedItemIndex && e) {
                    activeItemRef.current = e;
                    firstItemRef.current = e;
                    e.focus();
                  }
                }}
              >
                {product.name}
              </li>
            ))}
          </ul>}
      </form>
      <button className="form-search__reset" type="reset" onClick={handleReset}>
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>

    </div>
  );
}

export default FormSearch;
