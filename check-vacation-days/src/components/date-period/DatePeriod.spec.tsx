import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DatePeriod } from './DatePeriod';

// мокаем данные, т.к. надо мокать ant design компоненты

jest.mock('antd', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Layout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Typography: {
    Paragraph: ({ children }: { children: React.ReactNode }) => <p>{children}</p>,
  },
  DatePicker: {
    RangePicker: ({ onChange }: { onChange: (value: null) => void }) => (
      <input
        data-testid="range-picker"
        onChange={() => onChange(null)}
        type="text"
      />
    ),
  },
  Button: ({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled: boolean }) => (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
}));

test('Кнопка "Сделать запрос" неактивна пока пользователь не выбрал даты', () => {
  const onChange = jest.fn();
  render(<DatePeriod onChange={onChange} />);
  expect(screen.getByText(/Если вы хотите выбрать отпуск/i)).toBeInTheDocument();

  const button = screen.getByRole('button', { name: /Сделать запрос/i });
  expect(button).toBeDisabled();

  fireEvent.click(button);
  expect(onChange).not.toHaveBeenCalled();
});