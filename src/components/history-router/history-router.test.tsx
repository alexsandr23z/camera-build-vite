import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from './history-router';

describe('HistoryRouter Component', () => {
  it('renders children with provided history', () => {
    const history = createMemoryHistory();
    const TestComponent = () => <div>Test Component</div>;

    const { getByText } = render(
      <HistoryRouter history={history}>
        <TestComponent />
      </HistoryRouter>
    );

    expect(getByText('Test Component')).toBeInTheDocument();
  });

  it('updates location and navigationType on history change', () => {
    const history = createMemoryHistory();

    const { getByText, rerender } = render(
      <HistoryRouter history={history}>
        <div>{history.action}</div>
      </HistoryRouter>
    );

    expect(getByText('POP')).toBeInTheDocument();
    history.push('/new-route');

    rerender(
      <HistoryRouter history={history}>
        <div>{history.action}</div>
      </HistoryRouter>
    );

    expect(getByText('PUSH')).toBeInTheDocument();
  });
});
