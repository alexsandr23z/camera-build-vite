import React, { useState, useEffect } from 'react';
import { ProductCategory, ProductLevel, ProductType } from '../../consts';
import { TProducts } from '../../types/product';

type TFilters = {
  onCategoryChange: (category: string | null) => void;
  onTypeChange: (types: ProductType[]) => void;
  onLevelChange: (levels: ProductLevel[]) => void;
  onMinPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  minPrice: number | null;
  maxPrice: number | null;
  products: TProducts;
};

function Filters({
  onCategoryChange,
  onTypeChange,
  onLevelChange,
  onMinPriceChange,
  onMaxPriceChange,
  maxPrice,
  minPrice,
  products,
}: TFilters): React.JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<ProductType[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<ProductLevel[]>([]);
  const [inputMinPrice, setInputMinPrice] = useState<string>(minPrice !== null ? minPrice.toString() : '');
  const [inputMaxPrice, setInputMaxPrice] = useState<string>(maxPrice !== null ? maxPrice.toString() : '');
  const [isUserChanged, setIsUserChanged] = useState<boolean>(false);

  const photoCamera = products.filter((camera) => camera.category === ProductCategory.PhotoCamera);
  const videoCamera = products.filter((camera) => camera.category === ProductCategory.VideoCamera);

  const priceDefaultPhotoCamera = photoCamera.map((item) => item.price);
  const minPriceDefaultPhotoCamera = Math.min(...priceDefaultPhotoCamera);
  const maxPriceDefaultPhotoCamera = Math.max(...priceDefaultPhotoCamera);

  const priceDefaultVideoCamera = videoCamera.map((item) => item.price);
  const minPriceDefaultVideoCamera = Math.min(...priceDefaultVideoCamera);
  const maxPriceDefaultVideoCamera = Math.max(...priceDefaultVideoCamera);

  const handleCategoryChange = (category: string) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
    onCategoryChange(newCategory);

    setSelectedTypes([]);
    setSelectedLevels([]);
    onTypeChange([]);
    onLevelChange([]);
  };

  const handleTypeChange = (type: ProductType) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((selectedType) => selectedType !== type)
      : [...selectedTypes, type];

    setSelectedTypes(newTypes);
    onTypeChange(newTypes);
  };

  const handleLevelChange = (level: ProductLevel) => {
    const newLevels = selectedLevels.includes(level)
      ? selectedLevels.filter((selectedLevel) => selectedLevel !== level)
      : [...selectedLevels, level];

    setSelectedLevels(newLevels);
    onLevelChange(newLevels);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (inputValue === '' || (parseInt(inputValue, 10) >= 0 && inputValue !== '-')) {
      setIsUserChanged(true);
      setInputMinPrice(inputValue);
      onMinPriceChange(event);
    }
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (inputValue === '' || (parseInt(inputValue, 10) >= 0 && inputValue !== '-')) {
      setIsUserChanged(true);
      setInputMaxPrice(inputValue);
      onMaxPriceChange(event);
    }
  };

  const handleResetFilters = () => {
    setIsUserChanged(true);
    setSelectedCategory(null);
    setSelectedTypes([]);
    setSelectedLevels([]);
    onCategoryChange(null);
    onTypeChange([]);
    onLevelChange([]);
  };

  useEffect(() => {
    const minNumericValue = inputMinPrice !== '' ? parseInt(inputMinPrice, 10) : null;
    const maxNumericValue = inputMaxPrice !== '' ? parseInt(inputMaxPrice, 10) : null;

    if (minNumericValue !== null && maxNumericValue !== null && minNumericValue > maxNumericValue) {
      setInputMaxPrice(inputMinPrice);
      onMaxPriceChange({
        target: {
          value: inputMinPrice,
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }

    if (minNumericValue !== null && minPrice !== null) {
      if (minNumericValue <= minPriceDefaultPhotoCamera) {
        setInputMinPrice(minPrice.toString());
        onMinPriceChange({
          target: {
            value: minPrice.toString(),
          },
        } as React.ChangeEvent<HTMLInputElement>);
      } else if (maxPrice !== null && minNumericValue >= maxPriceDefaultPhotoCamera) {
        setInputMinPrice(maxPrice.toString());
        onMinPriceChange({
          target: {
            value: maxPrice.toString(),
          },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }

    if (maxNumericValue !== null && maxPrice !== null) {
      if (maxNumericValue >= maxPriceDefaultPhotoCamera) {
        setInputMaxPrice(maxPrice.toString());
        onMaxPriceChange({
          target: {
            value: maxPrice.toString(),
          },
        } as React.ChangeEvent<HTMLInputElement>);
      } else if (minPrice !== null && maxNumericValue <= minPriceDefaultPhotoCamera) {
        setInputMaxPrice(minPrice.toString());
        onMaxPriceChange({
          target: {
            value: minPrice.toString(),
          },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }

    if (minNumericValue !== null && minPrice !== null && selectedCategory === ProductCategory.VideoCamera) {
      if (minNumericValue <= minPriceDefaultVideoCamera) {
        setInputMinPrice(minPrice.toString());
        onMinPriceChange({
          target: {
            value: minPrice.toString(),
          },
        } as React.ChangeEvent<HTMLInputElement>);
      } else if (maxPrice !== null && minNumericValue >= maxPriceDefaultVideoCamera) {
        setInputMinPrice(maxPrice.toString());
        onMinPriceChange({
          target: {
            value: maxPrice.toString(),
          },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }

    if (maxNumericValue !== null && maxPrice !== null && selectedCategory === ProductCategory.VideoCamera) {
      if (maxNumericValue >= maxPriceDefaultVideoCamera) {
        setInputMaxPrice(maxPrice.toString());
        onMaxPriceChange({
          target: {
            value: maxPrice.toString(),
          },
        } as React.ChangeEvent<HTMLInputElement>);
      } else if (minPrice !== null && maxNumericValue <= minPriceDefaultVideoCamera) {
        setInputMaxPrice(minPrice.toString());
        onMaxPriceChange({
          target: {
            value: minPrice.toString(),
          },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }

  }, [inputMinPrice, inputMaxPrice, onMinPriceChange, onMaxPriceChange, minPrice, maxPrice, selectedCategory, minPriceDefaultPhotoCamera, maxPriceDefaultPhotoCamera, minPriceDefaultVideoCamera, maxPriceDefaultVideoCamera]);

  useEffect(() => {
    if(isUserChanged) {
      const filteredProducts = products
        .filter((camera) => (selectedCategory ? camera.category === selectedCategory : true))
        .filter((camera) => (selectedTypes.length === 0 ? true : selectedTypes.includes(camera.type)))
        .filter((camera) => (selectedLevels.length === 0 ? true : selectedLevels.includes(camera.level)));

      const nevMinPrice = Math.min(...filteredProducts.map((item) => item.price), 0);
      const nevMaxPrice = Math.max(...filteredProducts.map((item) => item.price), 0);

      setInputMinPrice(nevMinPrice.toString());
      setInputMaxPrice(nevMaxPrice.toString());
    }
  }, [selectedCategory, selectedTypes, selectedLevels, products, isUserChanged]);

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="price"
                  placeholder={minPrice !== null ? String(minPrice) : ''}
                  value={String(inputMinPrice)}
                  onChange={handleMinPriceChange}
                />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="priceUp"
                  placeholder={maxPrice !== null ? String(maxPrice) : ''}
                  value={String(inputMaxPrice)}
                  onChange={handleMaxPriceChange}
                />
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="photocamera"
                checked={selectedCategory === ProductCategory.PhotoCamera}
                onChange={() => handleCategoryChange(ProductCategory.PhotoCamera)}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Фотокамера</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="videocamera"
                checked={selectedCategory === ProductCategory.VideoCamera}
                onChange={() => handleCategoryChange(ProductCategory.VideoCamera)}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Видеокамера</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="digital"
                checked={selectedTypes.includes(ProductType.Digital)}
                onChange={() => handleTypeChange(ProductType.Digital)}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Цифровая</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="film"
                checked={selectedTypes.includes(ProductType.Film)}
                onChange={() => handleTypeChange(ProductType.Film)}
                disabled={selectedCategory === ProductCategory.VideoCamera}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Плёночная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="snapshot"
                checked={selectedTypes.includes(ProductType.Instant)}
                onChange={() => handleTypeChange(ProductType.Instant)}
                disabled={selectedCategory === ProductCategory.VideoCamera}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Моментальная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="collection"
                checked={selectedTypes.includes(ProductType.Collectible)}
                onChange={() => handleTypeChange(ProductType.Collectible)}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Коллекционная</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="zero"
                checked={selectedLevels.includes(ProductLevel.Zero)}
                onChange={() => handleLevelChange(ProductLevel.Zero)}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Нулевой</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="non-professional"
                checked={selectedLevels.includes(ProductLevel.Amateur)}
                onChange={() => handleLevelChange(ProductLevel.Amateur)}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Любительский</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input
                type="checkbox"
                name="professional"
                checked={selectedLevels.includes(ProductLevel.Professional)}
                onChange={() => handleLevelChange(ProductLevel.Professional)}
              />
              <span className="custom-checkbox__icon" />
              <span className="custom-checkbox__label">Профессиональный</span>
            </label>
          </div>
        </fieldset>
        <button
          className="btn catalog-filter__reset-btn"
          type="reset"
          onClick={handleResetFilters}
        >
          Сбросить фильтры
        </button>
      </form>
    </div>

  );
}

export default Filters;

