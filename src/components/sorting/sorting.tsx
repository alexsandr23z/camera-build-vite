import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SortOrder, SortType } from '../../consts';

type TSorting = {
  handleSortChange: (type: SortType, order: SortOrder) => void;
  sortType: SortType;
  setSortType: (type: SortType) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
};

function Sorting({ handleSortChange, sortType, setSortType, sortOrder, setSortOrder }: TSorting): React.JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = (type: SortType, order: SortOrder) => {
    const currentSearchParams = new URLSearchParams(searchParams);

    currentSearchParams.set('sortType', type);
    currentSearchParams.set('sortOrder', order);

    window.history.replaceState({}, '', `${window.location.pathname}?${currentSearchParams.toString()}`);
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const urlSortType = urlSearchParams.get('sortType');
    const urlSortOrder = urlSearchParams.get('sortOrder');

    if (urlSortType && urlSortOrder) {
      setSortType(urlSortType as SortType);
      setSortOrder(urlSortOrder as SortOrder);
      sessionStorage.setItem('sortType', urlSortType);
      sessionStorage.setItem('sortOrder', urlSortOrder);
    } else {
      const sessionSortType = sessionStorage.getItem('sortType');
      const sessionSortOrder = sessionStorage.getItem('sortOrder');

      if (sessionSortType !== null && sessionSortOrder !== null) {
        setSortType(sessionSortType as SortType);
        setSortOrder(sessionSortOrder as SortOrder);
      } else {
        setSortType(SortType.NoneType);
        setSortOrder(SortOrder.NoneOrder);
      }
    }
  }, [setSortType, setSortOrder]);

  useEffect(() => {
    sessionStorage.setItem('sortType', sortType);
    sessionStorage.setItem('sortOrder', sortOrder);

    const urlSearchParams = new URLSearchParams(window.location.search);
    if (urlSearchParams.get('sortType') !== null || urlSearchParams.get('sortOrder') !== null) {
      localStorage.setItem('sortType', sortType);
      localStorage.setItem('sortOrder', sortOrder);
    }
  }, [sortType, sortOrder]);

  const memoSearchParams = useMemo(() => searchParams, [searchParams]);

  useEffect(() => {
    setSearchParams(memoSearchParams);
  }, [memoSearchParams, setSearchParams]);

  const handleSortTypeChange = (type: SortType) => {
    setSortType(type);

    if (sortOrder === SortOrder.NoneOrder) {
      setSortOrder(SortOrder.Up);
      handleSortChange(type, SortOrder.Up);
    } else {
      handleSortChange(type, sortOrder);
    }

    updateSearchParams(type, sortOrder);
  };

  const handleSortOrderChange = (order: SortOrder) => {
    setSortOrder(order);

    if (sortType === SortType.NoneType) {
      setSortType(SortType.SortPrice);
      handleSortChange(SortType.SortPrice, order);
    } else {
      handleSortChange(sortType, order);
    }

    updateSearchParams(sortType, order);
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                checked={sortType === SortType.SortPrice}
                onChange={() => handleSortTypeChange(SortType.SortPrice)}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                checked={sortType === SortType.SortPopular}
                onChange={() => handleSortTypeChange(SortType.SortPopular)}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="sort-icon"
                aria-label="По возрастанию"
                checked={sortOrder === SortOrder.Up}
                onChange={() => handleSortOrderChange(SortOrder.Up)}
              />
              <label htmlFor="up">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                name="sort-icon"
                aria-label="По убыванию"
                checked={sortOrder === SortOrder.Down}
                onChange={() => handleSortOrderChange(SortOrder.Down)}
              />
              <label htmlFor="down">
                <svg width={16} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-sort" />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Sorting;
