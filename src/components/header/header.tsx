import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import FormSearch from '../form-search/form-search';
import { useAppSelector } from '../hook';
import { calculateTotalQuantityExcludingIds } from '../../util/util';

function Header(): React.JSX.Element {
  const basketCount = useAppSelector((state) => state.products.basketCount);
  const productQuantities = useAppSelector((state) => state.products.productQuantities);

  const totalQuantity = calculateTotalQuantityExcludingIds(productQuantities);

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
        <FormSearch/>
        <Link className="header__basket-link" to={AppRoute.Basket}>
          <svg width={16} height={16} aria-hidden="true">
            <use xlinkHref="#icon-basket" />
          </svg>
          {basketCount > 0 &&
            <span className="header__basket-count">{totalQuantity}</span>}
        </Link>
      </div>
    </header>
  );
}

export default Header;
