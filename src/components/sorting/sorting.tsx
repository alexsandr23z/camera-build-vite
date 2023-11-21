import React, {useEffect} from 'react';
import { SortOrder, SortType } from '../../consts';

type TSorting = {
  handleSortChange: (type: SortType, order: SortOrder) => void;
  sortType: SortType;
  setSortType: (type: SortType) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
}

function Sorting({handleSortChange, sortType, setSortType, sortOrder, setSortOrder}: TSorting): React.JSX.Element {

  const handleSortTypeChange = (type: SortType) => {
    setSortType(type);
    handleSortChange(type, sortOrder);
  };

  const handleSortOrderChange = (order: SortOrder) => {
    setSortOrder(order);

    if (sortType === SortType.NoneType) {
      setSortType(SortType.SortPrice);
      handleSortChange(SortType.SortPrice, order);
    } else {
      handleSortChange(sortType, order);
    }
  };

  useEffect(() => {
    const savedSortType = sessionStorage.getItem('sortType');
    const savedSortOrder = sessionStorage.getItem('sortOrder');

    if (savedSortType && savedSortOrder) {
      setSortType(savedSortType as SortType);
      setSortOrder(savedSortOrder as SortOrder);
    }
  }, [setSortOrder, setSortType]);

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
