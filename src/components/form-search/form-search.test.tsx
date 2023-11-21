import { render, fireEvent, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import FormSearch from './form-search';
import { productsMock } from '../../mocks/mocks';

const mockStore = configureMockStore();

describe('FormSearch', () => {
  it('renders FormSearch component', () => {
    const store = mockStore({ products: { products: productsMock } });
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <FormSearch />
        </MemoryRouter>
      </Provider>
    );

    expect(getByPlaceholderText('Поиск по сайту')).toBeInTheDocument();
  });

  it('handles input change and filters products', async () => {
    const store = mockStore({ products: { products: productsMock } });
    const { getByPlaceholderText, queryAllByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <FormSearch />
        </MemoryRouter>
      </Provider>
    );
    const input = getByPlaceholderText('Поиск по сайту');

    fireEvent.change(input, { target: { value: 'Retrocamera' } });

    await waitFor(() => {
      const retrocameraElements = queryAllByText('Retrocamera');
      expect(retrocameraElements).toHaveLength(1);
    });
  });

  it('handles arrow down key press and updates selected item', async () => {
    const store = mockStore({ products: { products: productsMock } });
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <FormSearch />
        </MemoryRouter>
      </Provider>
    );
    const input = getByPlaceholderText('Поиск по сайту');

    fireEvent.change(input, { target: { value: 'Retrocamera' } });
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    await waitFor(() => {
      const selectedItem = getByText('Retrocamera');
      expect(selectedItem).toHaveClass('form-search__select-item'); // Проверка класса
      expect(selectedItem).toHaveClass('_focus_538219'); // Проверка фокуса
    });
  });

  it('handles reset button click and resets the search', async () => {
    const store = mockStore({ products: { products: productsMock } });
    const { getByPlaceholderText, getByRole, queryByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <FormSearch />
        </MemoryRouter>
      </Provider>
    );
    const input = getByPlaceholderText('Поиск по сайту') as HTMLInputElement;
    const resetButton = getByRole('button', { name: 'Сбросить поиск' }) as HTMLButtonElement;

    fireEvent.change(input, { target: { value: 'Retrocamera' } });
    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(input.value).toBe('');
      expect(queryByText('Retrocamera')).toBeNull();
    });
  });
});
