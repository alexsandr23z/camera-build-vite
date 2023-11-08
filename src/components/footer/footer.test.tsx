import { render } from '@testing-library/react';
import Footer from './footer';

describe('Footer Component', () => {
  it('renders correctly', () => {
    const { getByText, getByLabelText } = render(<Footer />);

    expect(getByText('Интернет-магазин фото- и видеотехники')).toBeInTheDocument();
    expect(getByLabelText('Переход на главную')).toBeInTheDocument();

    expect(getByText('Навигация')).toBeInTheDocument();
    expect(getByText('Ресурсы')).toBeInTheDocument();
    expect(getByText('Поддержка')).toBeInTheDocument();

    expect(getByText('Каталог')).toBeInTheDocument();
    expect(getByText('Гарантии')).toBeInTheDocument();
    expect(getByText('Доставка')).toBeInTheDocument();
    expect(getByText('О компании')).toBeInTheDocument();
    expect(getByText('Курсы операторов')).toBeInTheDocument();
    expect(getByText('Блог')).toBeInTheDocument();
    expect(getByText('Сообщество')).toBeInTheDocument();
    expect(getByText('FAQ')).toBeInTheDocument();
    expect(getByText('Задать вопрос')).toBeInTheDocument();
  });
});
