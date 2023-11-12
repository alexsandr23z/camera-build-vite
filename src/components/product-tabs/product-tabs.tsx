import React, {useState, useEffect} from 'react';
import { TProduct } from '../../types/product';
import {useLocation, useNavigate} from 'react-router-dom';
import { ProductTabsSearch } from '../../consts';

type TProductTabsProps = {
  product: TProduct;
}

function ProductTabs({product}: TProductTabsProps): React.JSX.Element {
  const {vendorCode, type, category, level, description} = product;
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<string>(
    location.hash ||
    ProductTabsSearch.Specifications
  );

  useEffect(() => {
    navigate(activeTab);
  }, [activeTab, navigate]);

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button className={`tabs__control ${activeTab === ProductTabsSearch.Specifications ? 'is-active' : ''}`}
          type="button"
          onClick={() => setActiveTab(ProductTabsSearch.Specifications)}
        >
          Характеристики
        </button>
        <button className={`tabs__control ${activeTab === ProductTabsSearch.Description ? 'is-active' : ''}`}
          type="button"
          onClick={() => setActiveTab(ProductTabsSearch.Description)}
        >
          Описание
        </button>
      </div>
      <div className="tabs__content">
        <div className={`tabs__element ${activeTab === ProductTabsSearch.Specifications ? 'is-active' : ''}`}>
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
        <div className={`tabs__element ${activeTab === ProductTabsSearch.Description ? 'is-active' : ''}`}>
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
