import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useAppSelector } from '../../components/hook';
import ModalBasketRemoveProduct from '../../modal-basket-remove-product/modal-basket-remove-product';
import { TProduct } from '../../types/product';
import BasketProduct from '../../components/basket-product/basket-product';

function Basket(): React.JSX.Element {
  const products = useAppSelector((state) => state.products.basketProduct);
  const [modalBasketRemoveProductActive, setModalBasketRemoveProductActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);

  const [productQuantities, setProductQuantities] = useState<{ [key: number]: number }>(() => {
    const savedQuantities = localStorage.getItem('productQuantities');
    return savedQuantities ? JSON.parse(savedQuantities) as { [key: number]: number } : {};
  });

  const handleSetQuantity = (productId: number, quantity: number) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  useEffect(() => {
    localStorage.setItem('productQuantities', JSON.stringify(productQuantities));
  }, [productQuantities]);

  return (
    <div className="wrapper">
      <Helmet>
        <title>Корзина</title>
      </Helmet>
      <Header />
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="index.html">
                    Главная
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini" />
                    </svg>
                  </a>
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
                    Корзина
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <ul className="basket__list">
                {products.map((product) => (
                  <BasketProduct
                    key={product.id}
                    product={product}
                    setModalBasketRemoveProductActive={setModalBasketRemoveProductActive}
                    setSelectedProduct={setSelectedProduct}
                    quantity={productQuantities[Number(product.id)] || 1}
                    setQuantity={(quantity) => handleSetQuantity(Number(product.id), quantity)}
                  />)
                )}
                <ModalBasketRemoveProduct setQuantity={(quantity) => handleSetQuantity(Number(selectedProduct?.id), quantity)} product={selectedProduct} modalBasketRemoveProductActive={modalBasketRemoveProductActive} setModalBasketRemoveProductActive={setModalBasketRemoveProductActive}/>
              </ul>
              <div className="basket__summary">
                <div className="basket__promo">
                  <p className="title title--h4">
                    Если у вас есть промокод на скидку, примените его в этом поле
                  </p>
                  <div className="basket-form">
                    <form action="#">
                      <div className="custom-input">
                        <label>
                          <span className="custom-input__label">Промокод</span>
                          <input
                            type="text"
                            name="promo"
                            placeholder="Введите промокод"
                          />
                        </label>
                        <p className="custom-input__error">Промокод неверный</p>
                        <p className="custom-input__success">Промокод принят!</p>
                      </div>
                      <button className="btn" type="submit">
                        Применить
                      </button>
                    </form>
                  </div>
                </div>
                <div className="basket__summary-order">
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Всего:</span>
                    <span className="basket__summary-value">111 390 ₽</span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Скидка:</span>
                    <span className="basket__summary-value basket__summary-value--bonus">
                      0 ₽
                    </span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text basket__summary-text--total">
                      К оплате:
                    </span>
                    <span className="basket__summary-value basket__summary-value--total">
                      111 390 ₽
                    </span>
                  </p>
                  <button className="btn btn--purple" type="submit">
                    Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Basket;
