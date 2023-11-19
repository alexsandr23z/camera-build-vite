import React, {useState} from 'react';
import { SortOrder, SortType } from '../../consts';

type TSorting = {
  handleSortChange: (sortType: string, sortOrder: string) => void;
}

function Sorting({handleSortChange}: TSorting): React.JSX.Element {
  const [sortType, setSortType] = useState<string>(SortType.NoneType);
  const [sortOrder, setSortOrder] = useState<string>(SortOrder.Up);

  const handleSortTypeChange = (type: string) => {
    setSortType(type);
    handleSortChange(type, sortOrder);
  };

  const handleSortOrderChange = (order: string) => {
    setSortOrder(order);
    handleSortChange(sortType, order);
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
