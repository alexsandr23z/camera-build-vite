import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import ReviewList from './review-list';
import { reviewMocks } from '../../mocks/mocks';
import ReviewModalThanksPurchase from './review-modal-thanks-purchase';

describe('ReviewList component', () => {
  it('renders correctly', () => {
    render(<ReviewList reviewId={reviewMocks} />);
    const userNameElement = screen.getByText('User 1');
    const advantageElement = screen.getByText('advantage 1');
    const disadvantageElement = screen.getByText('disadvantage 1');
    const reviewElement = screen.getByText('Камера достаточно хорошая, но не очень радует цена.');

    expect(userNameElement).toBeInTheDocument();
    expect(advantageElement).toBeInTheDocument();
    expect(disadvantageElement).toBeInTheDocument();
    expect(reviewElement).toBeInTheDocument();
  });
});

describe('ReviewModalThanksPurchase component', () => {
  const setModalThanksPurchaseActive = vi.fn();
  it('renders correctly', () => {
    render(
      <ReviewModalThanksPurchase
        modalThanksPurchaseActive
        setModalThanksPurchaseActive={setModalThanksPurchaseActive}
      />
    );
    const modalElement = screen.getByText('Спасибо за отзыв');
    expect(modalElement).toBeInTheDocument();
  });
});
