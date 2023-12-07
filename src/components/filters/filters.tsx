import React, { useState, useEffect } from 'react';
import { ProductCategory, ProductLevel, ProductType } from '../../consts';
import { TProducts } from '../../types/product';
// import { useSearchParams } from 'react-router-dom';

type TFilters = {
  onCategoryChange: (category: string | null) => void;
  onTypeChange: (types: string[]) => void;
  onLevelChange: (levels: string[]) => void;
  onMinPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  minPrice: number | null;
  maxPrice: number | null;
  setMinPrice: (min: number | null) => void;
  setMaxPrice: (max: number | null) => void;
  products: TProducts;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
  selectedLevels: string[];
  setSelectedLevels: (levels: string[]) => void;
  inputMinPrice: string;
  setInputMinPrice: (minPrice: string) => void;
  inputMaxPrice: string;
  setInputMaxPrice: (maxPrice: string) => void;

};

function Filters({
  onCategoryChange,
  onTypeChange,
  onLevelChange,
  onMinPriceChange,
  onMaxPriceChange,
  maxPrice,
  minPrice,
  setMinPrice,
  setMaxPrice,
  products,
  selectedCategory,
  setSelectedCategory,
  selectedTypes,
  setSelectedTypes,
  selectedLevels,
  setSelectedLevels,
  inputMinPrice,
  setInputMinPrice,
  inputMaxPrice,
  setInputMaxPrice
}: TFilters): React.JSX.Element {
  const [isUserChanged, setIsUserChanged] = useState<boolean>(false);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const urlCategory = urlSearchParams.get('category');

    if (urlCategory !== null && urlCategory !== 'null') {
      setSelectedCategory(urlCategory);
      sessionStorage.setItem('category', urlCategory);
    } else if (urlCategory === 'null') {
      setSelectedCategory(null);
      sessionStorage.setItem('category', 'null');
    } else {
      const sessionCategory = sessionStorage.getItem('category');
      if (sessionCategory !== null && sessionCategory !== 'null') {
        setSelectedCategory(sessionCategory);
      } else {
        setSelectedCategory(null);
        sessionStorage.setItem('category', 'null');
      }
    }
  }, [setSelectedCategory]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const urlTypes = urlSearchParams.getAll('types');

    if (urlTypes.length > 0 && urlTypes[0] !== '') {
      const firstType = Array.isArray(urlTypes) ? urlTypes[0] : urlTypes;
      const typesArray = firstType.split(',');

      setSelectedTypes(typesArray);
      sessionStorage.setItem('types', JSON.stringify(typesArray));
    } else if (urlTypes[0] === '') {
      setSelectedTypes([]);
      sessionStorage.setItem('types', '');
    } else {
      const sessionTypes = sessionStorage.getItem('types');
      if (sessionTypes !== null && sessionTypes !== '') {
        setSelectedTypes(JSON.parse(sessionTypes) as string[]);
      } else {
        setSelectedTypes([]);
        sessionStorage.setItem('types', '');
      }
    }
  }, [setSelectedTypes]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const urlLevels = urlSearchParams.getAll('levels');

    if (urlLevels.length > 0 && urlLevels[0] !== '') {
      const firstLevels = Array.isArray(urlLevels) ? urlLevels[0] : urlLevels;
      const levelsArray = firstLevels.split(',');

      setSelectedLevels(levelsArray);
      sessionStorage.setItem('levels', JSON.stringify(levelsArray));
    } else if (urlLevels[0] === '') {
      setSelectedLevels([]);
      sessionStorage.setItem('levels', '');
    } else {
      const sessionLevels = sessionStorage.getItem('levels');
      if (sessionLevels !== null && sessionLevels !== '') {
        setSelectedLevels(JSON.parse(sessionLevels) as string[]);
      } else {
        setSelectedLevels([]);
        sessionStorage.setItem('levels', '');
      }
    }
  }, [setSelectedLevels]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const urlMinPrice = urlSearchParams.get('min');

    if (urlMinPrice !== null && urlMinPrice !== 'null' && urlMinPrice !== '') {
      setMinPrice(Number(urlMinPrice));
      setInputMinPrice(urlMinPrice);
      sessionStorage.setItem('min', urlMinPrice);
    } else if (urlMinPrice === '') {
      setMinPrice(null);
      setInputMinPrice('');
      sessionStorage.setItem('min', 'null');
    } else {
      const sessionMinPrice = sessionStorage.getItem('min');
      if (sessionMinPrice !== null && sessionMinPrice !== 'null') {
        setMinPrice(Number(sessionMinPrice));
        setInputMinPrice(sessionMinPrice);
      } else {
        setMinPrice(null);
        setInputMinPrice('');
        sessionStorage.setItem('min', 'null');
      }
    }
  }, [setInputMinPrice, setMinPrice]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const urlMaxPrice = urlSearchParams.get('max');

    if (urlMaxPrice !== null && urlMaxPrice !== 'null' && urlMaxPrice !== '') {
      setMaxPrice(Number(urlMaxPrice));
      setInputMaxPrice(urlMaxPrice);
      sessionStorage.setItem('max', urlMaxPrice);
    } else if (urlMaxPrice === '') {
      setMaxPrice(null);
      setInputMaxPrice('');
      sessionStorage.setItem('max', 'null');
    } else {
      const sessionMaxPrice = sessionStorage.getItem('max');

      if (sessionMaxPrice !== null && sessionMaxPrice !== 'null') {
        setMaxPrice(Number(sessionMaxPrice));
        setInputMaxPrice(sessionMaxPrice);
      } else {
        setMaxPrice(null);
        setInputMaxPrice('');
        sessionStorage.setItem('max', 'null');
      }
    }
  }, [setInputMaxPrice, setMaxPrice]);

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

  const handleTypeChange = (types: string) => {
    const newTypes = selectedTypes.includes(types)
      ? selectedTypes.filter((selectedType) => selectedType !== types)
      : [...selectedTypes, types];

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
    setIsUserChanged(false);
    setMinPrice(null);
    setMaxPrice(null);
    setInputMinPrice('');
    setInputMaxPrice('');
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

  }, [inputMinPrice, inputMaxPrice, onMinPriceChange, onMaxPriceChange, minPrice, maxPrice, selectedCategory, minPriceDefaultPhotoCamera, maxPriceDefaultPhotoCamera, minPriceDefaultVideoCamera, maxPriceDefaultVideoCamera, setInputMaxPrice, setInputMinPrice]);

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
  }, [selectedCategory, selectedTypes, selectedLevels, products, isUserChanged, setInputMinPrice, setInputMaxPrice]);

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
