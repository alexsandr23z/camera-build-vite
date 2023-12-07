import { render, fireEvent, screen } from '@testing-library/react';
import Filters from './filters';
import { vi } from 'vitest';
import { productMock } from '../../mocks/mocks';
import { TProducts } from '../../types/product';
import { ProductCategory } from '../../consts';
import { BrowserRouter } from 'react-router-dom';

describe('Filters component', () => {
  const mockOnCategoryChange = vi.fn();
  const mockOnTypeChange = vi.fn();
  const mockOnLevelChange = vi.fn();
  const mockOnMinPriceChange = vi.fn();
  const mockOnMaxPriceChange = vi.fn();
  const mockSetSelectedCategory = vi.fn();
  const mockSetSelectedTypes = vi.fn();
  const mockSetSelectedLevels = vi.fn();
  const mockSetMinPrice = vi.fn();
  const mockSetMaxPrice = vi.fn();

  const products: TProducts = [productMock];

  it('handles category change correctly', () => {
    render(
      <BrowserRouter>
        <Filters
          onCategoryChange={mockOnCategoryChange}
          onTypeChange={mockOnTypeChange}
          onLevelChange={mockOnLevelChange}
          onMinPriceChange={mockOnMinPriceChange}
          onMaxPriceChange={mockOnMaxPriceChange}
          setSelectedCategory={mockSetSelectedCategory}
          setSelectedTypes={mockSetSelectedTypes}
          setSelectedLevels={mockSetSelectedLevels}
          setMinPrice={mockSetMinPrice}
          setMaxPrice={mockSetMaxPrice}
          products={products}
          minPrice={null}
          maxPrice={null}
          selectedCategory={null}
          selectedTypes={[]}
          selectedLevels={[]}
          inputMinPrice={''}
          setInputMinPrice={vi.fn()}
          inputMaxPrice={''}
          setInputMaxPrice={vi.fn()}
        />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByLabelText('Фотокамера'));

    expect(mockSetSelectedCategory).toHaveBeenCalledWith(ProductCategory.PhotoCamera);
    expect(mockOnCategoryChange).toHaveBeenCalledWith(ProductCategory.PhotoCamera);
    expect(mockSetSelectedTypes).toHaveBeenCalledWith([]);
    expect(mockSetSelectedLevels).toHaveBeenCalledWith([]);
    expect(mockOnTypeChange).toHaveBeenCalledWith([]);
    expect(mockOnLevelChange).toHaveBeenCalledWith([]);
  });
});
