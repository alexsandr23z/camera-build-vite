import React, {useEffect, useRef} from 'react';
import { MAX_COUNT_PRODUCTS } from '../../consts';
import {Link, useSearchParams} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hook';
import { decrementPagination, incrementPagination, setCurrentPage } from '../../store/slices/pagination-slices/pagination-slices';

type TPaginationProps = {
  paginationCount: number;
  productsLength: number;
}

function Pagination({paginationCount, productsLength}: TPaginationProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const paginationPages = useAppSelector((state) => state.pagination.paginationPages);
  const [searchParams, setSearchParams] = useSearchParams();
  const lastPaginationNumbers: number[] = [];
  const remain = paginationCount % 3;
  const start = paginationCount - remain;
  const end = start + remain;

  const page: string | null = searchParams.get('page');

  for (let index = end; index > start; index--) {
    lastPaginationNumbers.push(index);
  }

  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if(currentPage && isMountedRef) {
      if(paginationPages[0] >= currentPage) {
        dispatch(setCurrentPage(paginationPages[0]));
      } else if(paginationPages[2] <= currentPage) {
        dispatch(setCurrentPage(paginationPages[2]));
      }
      setSearchParams({page: `${currentPage}`});
    }
  }, [currentPage, dispatch, end, page, paginationPages, setSearchParams, isMountedRef]);

  useEffect(() => {
    if(page && isMountedRef) {
      dispatch(setCurrentPage(Number(page)));
      if(Number(page) > paginationPages[2]) {
        dispatch(incrementPagination());
        dispatch(setCurrentPage(Number(page)));
      }
    }
  }, [dispatch, page, currentPage, paginationPages, end, isMountedRef]);

  const handlePaginationClick = (pageNumber: number) => {
    setSearchParams({ page: `${pageNumber}` });
    dispatch(setCurrentPage(pageNumber));
  };

  const handleIncrementPagination = (pageNumber: number) => {
    if(pageNumber >= paginationPages[2]) {
      dispatch(incrementPagination());
    }
    setSearchParams({ page: `${pageNumber + 1}` });
    dispatch(setCurrentPage(pageNumber + 1));
  };

  const handleDecrementPagination = (pageNumber: number) => {
    if(pageNumber <= paginationPages[0]) {
      dispatch(decrementPagination());
    }
    setSearchParams({ page: `${pageNumber - 1}` });
    dispatch(setCurrentPage(pageNumber - 1));
  };

  if(productsLength < MAX_COUNT_PRODUCTS) {
    return <div></div>;
  }

  return (
    <div className="pagination">
      {currentPage && currentPage <= end &&
      <ul className="pagination__list">
        {currentPage > 3 &&
          <li className="pagination__item" onClick={() => handleDecrementPagination(Number(page))}>
            <Link
              className="pagination__link pagination__link--text"
              to={'#'}
            >
              Назад
            </Link>
          </li>}
        {currentPage <= start ? paginationPages.map((number) => (
          <li key={number} className="pagination__item" onClick={() => handlePaginationClick(number)}>
            <Link
              className={`${currentPage === number ? 'pagination__link pagination__link--active' : 'pagination__link'}`}
              to={'#'}
            >
              {number}
            </Link>
          </li>)
        ) : lastPaginationNumbers.map((number) => (
          <li key={number} className="pagination__item" onClick={() => handlePaginationClick(number)}>
            <Link
              className={`${currentPage === number ? 'pagination__link pagination__link--active' : 'pagination__link'}`}
              to={'#'}
            >
              {number}
            </Link>
          </li>)
        ).reverse()}
        { currentPage <= start &&
          <li className="pagination__item" onClick={() => handleIncrementPagination(Number(page))}>
            <Link
              className="pagination__link pagination__link--text"
              to={'#'}
            >
            Далее
            </Link>
          </li>}
      </ul>}
    </div>
  );
}

export default Pagination;

