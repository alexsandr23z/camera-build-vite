import { render } from '@testing-library/react';
import Rating from './rating';
import { showActiveRateng, showDisabledRateng } from '../../util/util';


describe('Rating Component', () => {

  it('renders the correct rating text', () => {
    const { getByText } = render(<Rating rating={3} reviewCount={10} />);
    expect(getByText('Рейтинг: 3')).toBeInTheDocument();
  });

  it('correctly generates active rating array', () => {
    const activeRating = showActiveRateng(3);
    expect(activeRating).toEqual([1, 2, 3]);
  });

  it('correctly generates disabled rating array', () => {
    const disabledRating = showDisabledRateng(3);
    expect(disabledRating).toEqual([1, 2]);
  });
});
