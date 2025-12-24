import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DaysInputCard } from './DaysInputCard';

describe('DaysInputCard', () => {
  it('renders the value correctly', () => {
    //рендерим компонент с тестовым значением, и проверяем что это значение отображается на странице
    const { getByText } = render(<DaysInputCard value={10} setValue={function (): void {
      throw new Error('Function not implemented.');
    } } />);
    expect(getByText('10')).toBeInTheDocument(); // проверяем что число 10 отображается
    expect(getByText('Количество дней отпуска в текущем году')).toBeInTheDocument(); // проверяем что текст отображается
  });
});
