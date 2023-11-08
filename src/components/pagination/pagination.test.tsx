import { render } from '@testing-library/react';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Pagination from './pagination.tsx';

const mockStore = configureMockStore([]);

describe('Component: Pagination', () => {
  let store: MockStore;
  let initialState;

  beforeEach(() => {
    initialState = {
      pagination: {
        currentPage: 1,
        paginationPages: [1, 2, 3],
      },
    };
    store = mockStore(initialState);
  });

  it('renders correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Pagination paginationCount={9} productsLength={10} />
        </BrowserRouter>
      </Provider>
    );

    const paginationElement = getByText('2');
    expect(paginationElement).toBeInTheDocument();
  });
});
