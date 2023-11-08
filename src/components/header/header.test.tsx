import { render } from '@testing-library/react';
import Header from './header';

describe('Header Component', () => {
  it('renders correctly', () => {
    const { getByText, getByLabelText } = render(<Header />);

    expect(getByText('Каталог')).toBeInTheDocument();
    expect(getByText('Гарантии')).toBeInTheDocument();
    expect(getByText('Доставка')).toBeInTheDocument();
    expect(getByText('О компании')).toBeInTheDocument();
    expect(getByLabelText('Переход на главную')).toBeInTheDocument();

    expect(getByText('Cannonball Pro MX 8i')).toBeInTheDocument();
    expect(getByText('Cannonball Pro MX 7i')).toBeInTheDocument();
    expect(getByText('Cannonball Pro MX 6i')).toBeInTheDocument();
    expect(getByText('Cannonball Pro MX 5i')).toBeInTheDocument();
    expect(getByText('Cannonball Pro MX 4i')).toBeInTheDocument();

    expect(getByText('Сбросить поиск')).toBeInTheDocument();

  });
});
