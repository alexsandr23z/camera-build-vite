import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Sorting from './sorting';
import { vi } from 'vitest';
import { SortOrder, SortType } from '../../consts';
import { BrowserRouter } from 'react-router-dom';

describe('Sorting component', () => {
  it('renders without crashing', () => {
    const handleSortChange = vi.fn();
    const { getByText } = render(
      <BrowserRouter>
        <Sorting
          handleSortChange={handleSortChange}
          sortType={SortType.NoneType}
          setSortType={vi.fn()}
          sortOrder={SortOrder.NoneOrder}
          setSortOrder={vi.fn()}
        />
      </BrowserRouter>
    );
    expect(getByText('Сортировать:')).toBeInTheDocument();
  });

  it('triggers handleSortTypeChange when radio button for sort type is clicked', () => {
    const handleSortChange = vi.fn();
    const setSortType = vi.fn();
    const { getByLabelText } = render(
      <BrowserRouter>
        <Sorting
          handleSortChange={handleSortChange}
          sortType={SortType.NoneType}
          setSortType={setSortType}
          sortOrder={SortOrder.NoneOrder}
          setSortOrder={vi.fn()}
        />
      </BrowserRouter>
    );

    fireEvent.click(getByLabelText('по цене'));
    expect(setSortType).toHaveBeenCalledWith('sortPrice');
  });

  it('triggers handleSortOrderChange when radio button for sort order is clicked', () => {
    const handleSortChange = vi.fn();
    const setSortOrder = vi.fn();
    const { getByLabelText } = render(
      <BrowserRouter>
        <Sorting
          handleSortChange={handleSortChange}
          sortType={SortType.NoneType}
          setSortType={vi.fn()}
          sortOrder={SortOrder.NoneOrder}
          setSortOrder={setSortOrder}
        />
      </BrowserRouter>
    );

    fireEvent.click(getByLabelText('По возрастанию'));
    expect(setSortOrder).toHaveBeenCalledWith('up');
  });
});
