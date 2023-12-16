import React, { useState, useEffect, ChangeEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useAppDispatch, useAppSelector } from '../../components/hook';
import ModalBasketRemoveProduct from '../../modal-basket-remove-product/modal-basket-remove-product';
import { TProduct } from '../../types/product';
import BasketProduct from '../../components/basket-product/basket-product';
import { formatNumberPrice } from '../../util/util';
import { addPromoCode, setIsSendsPromoCode, setPromoCodeValid } from '../../store/slices/promo-code-slices/promo-code-slices';
import { submitPromoCode } from '../../store/api-action/promo-code-api/promo-code-api';
import { PromoCode } from '../../consts';
import cn from 'classnames';

function Basket(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const coupons = useAppSelector((state) => state.promoCode.coupons);
  const isValid = useAppSelector((state) => state.promoCode.isValid);
  const isSends = useAppSelector((state) => state.promoCode.isSends);
  const products = useAppSelector((state) => state.products.basketProduct);
  const [modalBasketRemoveProductActive, setModalBasketRemoveProductActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);

  const [productQuantities, setProductQuantities] = useState<{ [key: string]: number }>(() => {
    const savedQuantities = localStorage.getItem('productQuantities');
    return savedQuantities ? JSON.parse(savedQuantities) as { [key: string]: number } : {};
  });

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalCouponPrice, setTotalCouponPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(() => {
    const savedDiscount = localStorage.getItem('discount');
    return savedDiscount !== null ? parseFloat(savedDiscount) : 0;
  });

  const handleSetQuantity = (productId: number, quantity: number) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  useEffect(() => {
    if (selectedProduct && !products.find((p) => p.id === selectedProduct.id)) {
      setProductQuantities((prevQuantities) => {
        const productIdString = String(selectedProduct.id);
        const { [productIdString]: removedQuantity, ...newQuantities } = prevQuantities;
        void removedQuantity;
        return { ...newQuantities };
      });
    }
  }, [products, selectedProduct]);

  useEffect(() => {
    localStorage.setItem('productQuantities', JSON.stringify(productQuantities));
  }, [productQuantities]);

  useEffect(() => {
    const newTotalPrice = products.reduce((acc, product) => {
      const productId = String(product.id);
      const quantity = productQuantities[Number(productId)] || 1;
      return acc + product.price * quantity;
    }, 0);
    setTotalPrice(newTotalPrice);

    const discountedPrice = newTotalPrice - (newTotalPrice * discount) / 100;
    setTotalCouponPrice(discountedPrice);

  }, [products, productQuantities, discount]);

  function handleCouponsChange(evt: ChangeEvent<HTMLInputElement>) {
    dispatch(addPromoCode(evt.target.value));
  }

  useEffect(() => {
    if (coupons === PromoCode.PromoOne || coupons === PromoCode.PromoTwo || coupons === PromoCode.PromoThree) {
      dispatch(setPromoCodeValid(true));
    } else {
      dispatch(setPromoCodeValid(false));
    }
  }, [dispatch, coupons]);

  function handleFormSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    dispatch(setIsSendsPromoCode());
    if(isValid) {
      dispatch(submitPromoCode({coupon : coupons}));
    }
  }

  useEffect(() => {
    if (typeof coupons === 'number' && coupons > 0) {
      setDiscount(coupons);
    } else {
      setDiscount(0);
    }
  }, [coupons]);

  useEffect(() => {
    const storedDiscount = localStorage.getItem('discount');
    if (storedDiscount !== null) {
      setDiscount(parseFloat(storedDiscount));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('discount', String(discount));
  }, [discount]);

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
                    <form onSubmit={handleFormSubmit}>
                      <div className={cn(
                        'custom-input',
                        {'is-invalid': isValid === false && isSends},
                        {'is-valid': !isSends && discount > 0},
                      )}
                      >
                        <label>
                          <span className="custom-input__label">Промокод</span>
                          <input
                            type="text"
                            name="promo"
                            placeholder="Введите промокод"
                            onChange={handleCouponsChange}
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
                    <span className="basket__summary-value">{formatNumberPrice(totalPrice)} ₽</span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Скидка:</span>
                    <span className={discount > 0 ? 'basket__summary-value basket__summary-value--bonus' : 'basket__summary-value'}>
                      {formatNumberPrice(Math.floor(totalPrice - totalCouponPrice))} ₽
                    </span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text basket__summary-text--total">
                      К оплате:
                    </span>
                    <span className="basket__summary-value basket__summary-value--total">
                      {formatNumberPrice(totalCouponPrice)} ₽
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
