import React, {useEffect} from 'react';
import { MAX_COUNT_PRODUCTS } from '../../consts';
import {Link} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hook';
import { setCurrentPage } from '../../store/slices/pagination-slices';

type TPaginationProps = {
  paginationCount: number;
  productsLength: number;
}

function Pagination({paginationCount, productsLength}: TPaginationProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const paginationNumbers: number[] = [];

  for (let index = 1; index <= paginationCount; index++) {
    paginationNumbers.push(index);
  }

  const handlePaginationClick = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [dispatch]);

  if(productsLength < MAX_COUNT_PRODUCTS) {
    return <div></div>;
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        { currentPage > 3 &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={''}
            >
              Назад
            </Link>
          </li>}
        {paginationNumbers.map((number) => (
          <li key={number} className="pagination__item" onClick={() => handlePaginationClick(number)}>
            <Link
              className={`${currentPage === number ? 'pagination__link pagination__link--active' : 'pagination__link'}`}
              to={''}
            >
              {number}
            </Link>
          </li>)
        )}
        <li className="pagination__item">
          <Link
            className="pagination__link pagination__link--text"
            to={''}
          >
            Далее
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
// {`${number}`}
