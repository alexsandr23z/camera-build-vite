import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import ProductCardInfo from '../../components/product-card-info/product-card-info';
import {Link} from 'react-router-dom';
import { AppRoute } from '../../consts';
import {useParams} from 'react-router-dom';
import { fetchProduct } from '../../store/api-action/product-api';
import { dropProduct } from '../../store/slices/product-slices';
import { useAppDispatch, useAppSelector } from '../../components/hook';
import ProductSimilar from '../../components/product-similar/product-similar';
import { fetchProductsSimilar } from '../../store/api-action/product-similar-api';
import { dropProductsSimilar } from '../../store/slices/product-similar-slices';
import ReviewBlock from '../../components/review/review-block';

function Product(): React.JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.product);
  const productsSimilar = useAppSelector((state) => state.productsSimilar.productsSimilar);

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct({ id }));
      dispatch(fetchProductsSimilar({ id }));
    }

    return () => {
      dispatch(dropProduct());
      dispatch(dropProductsSimilar());
    };
  }, [dispatch, id]);

  if(!product || !id) {
    return (
      <div></div>
    );
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>Товары</title>
      </Helmet>
      <Header/>
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Main}>
                    Главная
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini" />
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="catalog.html">
                    Каталог
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini" />
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">
                    {product.name}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="page-content__section">
            <section className="product">
              <ProductCardInfo product={product}/>
            </section>
          </div>
          <div className="page-content__section">
            <ProductSimilar productsSimilar={productsSimilar}/>
          </div>
          <div className="page-content__section">
            <section className="review-block">
              <ReviewBlock id={id}/>
            </section>
          </div>
        </div>
      </main>
      <a className="up-btn" href="#header">
        <svg width={12} height={18} aria-hidden="true">
          <use xlinkHref="#icon-arrow2" />
        </svg>
      </a>
      <Footer/>
    </div>

  );
}

export default Product;
