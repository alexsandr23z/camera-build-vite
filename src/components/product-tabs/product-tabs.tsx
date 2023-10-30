import React, {useState, useEffect} from 'react';
import { TProduct } from '../../types/product';
import {useSearchParams} from 'react-router-dom';

type TProductTabsProps = {
  product: TProduct;
}

function ProductTabs({product}: TProductTabsProps): React.JSX.Element {
  const [productTabsActive, setProductTabsActive] = useState(0);
  const {vendorCode, type, category, description, level} = product;
  const [searchParams, setSearchParams] = useSearchParams();

  const specifications: string | null = searchParams.get('specifications');
  const descriptions: string | null = searchParams.get('descriptions');

  useEffect(() => {
    if(productTabsActive === 0) {
      setSearchParams({specifications: 'Характеристики'});
    } else if(productTabsActive === 1) {
      setSearchParams({descriptions: 'Описание'});
    }
  }, [specifications, descriptions, setSearchParams, productTabsActive]);

  const handleSpecificationsClick = () => {
    setProductTabsActive(0);
  };

  const handleDescriptionsClick = () => {
    setProductTabsActive(1);
  };

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button className={`tabs__control ${productTabsActive === 0 ? 'is-active' : ''}`} type="button" onClick={handleSpecificationsClick}>
          Характеристики
        </button>
        <button className={`tabs__control ${productTabsActive === 1 ? 'is-active' : ''}`} type="button" onClick={handleDescriptionsClick}>
          Описание
        </button>
      </div>
      <div className="tabs__content">
        <div className={`tabs__element ${productTabsActive === 0 ? 'is-active' : ''}`}>
          <ul className="product__tabs-list">
            <li className="item-list">
              <span className="item-list__title">Артикул:</span>
              <p className="item-list__text"> {vendorCode}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Категория:</span>
              <p className="item-list__text">{category}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Тип камеры:</span>
              <p className="item-list__text">{type}</p>
            </li>
            <li className="item-list">
              <span className="item-list__title">Уровень:</span>
              <p className="item-list__text">{level}</p>
            </li>
          </ul>
        </div>
        <div className={`tabs__element ${productTabsActive === 1 ? 'is-active' : ''}`}>
          <div className="product__tabs-text">
            <p>
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductTabs;
