import React, {useEffect} from 'react';
import { MAX_COUNT_PRODUCTS } from '../../consts';
import {Link} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hook';
import { decrementPagination, incrementPagination, setCurrentPage } from '../../store/slices/pagination-slices';

type TPaginationProps = {
  paginationCount: number;
  productsLength: number;
}

function Pagination({paginationCount, productsLength}: TPaginationProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const paginationPages = useAppSelector((state) => state.pagination.paginationPages);
  const paginationNumbers: number[] = [];

  const lastPaginationPages = paginationPages[paginationPages.length - 1];

  for (let index = paginationCount; index >= paginationPages[0]; index--) {
    paginationNumbers.push(index);
  }

  const handlePaginationClick = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  useEffect(() => {
    if(paginationPages[0] >= currentPage) {
      dispatch(setCurrentPage(paginationPages[0]));
    } else if(paginationPages[2] <= currentPage) {
      dispatch(setCurrentPage(paginationPages[2]));
    }
  }, [currentPage, dispatch, paginationPages]);

  const handleIncrementPagination = () => {
    dispatch(incrementPagination());
  };

  const handleDecrementPagination = () => {
    dispatch(decrementPagination());
  };

  if(productsLength < MAX_COUNT_PRODUCTS) {
    return <div></div>;
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        { currentPage > 3 &&
          <li className="pagination__item" onClick={handleDecrementPagination}>
            <Link
              className="pagination__link pagination__link--text"
              to={`/?page=${paginationPages[2]}`}
            >
              Назад
            </Link>
          </li>}
        {lastPaginationPages <= paginationCount ? paginationPages.map((number) => (
          <li key={number} className="pagination__item" onClick={() => handlePaginationClick(number)}>
            <Link
              className={`${currentPage === number ? 'pagination__link pagination__link--active' : 'pagination__link'}`}
              to={`/?page=${number}`}
            >
              {number}
            </Link>
          </li>)
        ) : paginationNumbers.map((number) => (
          <li key={number} className="pagination__item" onClick={() => handlePaginationClick(number)}>
            <Link
              className={`${currentPage === number ? 'pagination__link pagination__link--active' : 'pagination__link'}`}
              to={`/?page=${number}`}
            >
              {number}
            </Link>
          </li>)
        ).reverse()}
        { lastPaginationPages <= paginationCount &&
          <li className="pagination__item" onClick={handleIncrementPagination}>
            <Link
              className="pagination__link pagination__link--text"
              to={`/?page=${paginationPages[0]}`}
            >
            Далее
            </Link>
          </li>}
      </ul>
    </div>
  );
}

export default Pagination;

