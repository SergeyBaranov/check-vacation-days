import React from 'react';
import { Card, Layout, Typography, DatePicker, Button } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import 'dayjs/locale/ru';
dayjs.locale('ru');

interface DatePeriodProps {
  onChange: (data: { dates: string[], start: string, end: string }) => void;
}

const {Paragraph } = Typography;
const { RangePicker } = DatePicker;

export const DatePeriod: React.FC<DatePeriodProps> = ({ onChange }) => {
  const [selectedDates, setSelectedDates] = React.useState<[Dayjs, Dayjs] | null>(null);

  // обработка изменения выбранных дат
  const handleChange = (dates: [Dayjs | null, Dayjs | null] | null): void => {
    if (dates && dates[0] && dates[1]) {
      setSelectedDates([dates[0], dates[1]]);
    } else {
      setSelectedDates(null);
    }
  };

  // не даем пользователю выбирать дату перед текущей датой
  const disabledDate = (current: Dayjs) => {
    return current && current < dayjs().startOf('day');
  };

  // при нажатии на кнопку формируем массив строк с выбранными датами и передаем его в onChange
  const handleButtonClick = () => {
    if (!selectedDates) {
      onChange({ dates: [], start: '', end: '' });
      return;
    }
    const [start, end] = selectedDates;
    const datesArray: string[] = [];
    let current = start;
    while (current.isBefore(end) || current.isSame(end, 'day')) {
      // добавляем все дни, включая выходные
      datesArray.push(current.format('YYYY-MM-DD'));
      current = current.add(1, 'day');
    }
    onChange({
      dates: datesArray,
      start: start.format('YYYY-MM-DD'),
      end: end.format('YYYY-MM-DD')
    });
  };

  // функция для рендера дат с подсветкой выходных
  const cellRender = (current: string | number | Dayjs) => {
    const dayjsDate = dayjs.isDayjs(current) ? current : dayjs(current);
    const dayOfWeek = dayjsDate.day(); // 0 - воскресенье, 6 - суббота
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    return (
      <div style={{ color: isWeekend ? 'red' : 'inherit' }}>
        {dayjsDate.date()}
      </div>
    );
  };

  const handleCheckboxChange: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <Layout style={{ maxWidth: '100%', background: 'transparent', textAlign: 'left' }}>
      <Card style={{display: 'flex', flexDirection: 'column'}} >
         <Paragraph>
          Если вы хотите выбрать отпуск, выберите даты начала и окончания
        </Paragraph>
        <RangePicker
          style={{
            width: '100%',
            marginBottom: '1rem'
          }}
          onChange={handleChange}
          disabledDate={disabledDate} // запрещаем выбирать дату до текущего дня
          cellRender={cellRender}
        />
        <Checkbox onChange={handleCheckboxChange}>Показать производственный календарь</Checkbox>
        {/* кнопка для передачи диапазона дат в поле аппрува */}
        <Button
          type="primary"
          style={{width: '100%'}}
          onClick={handleButtonClick}
          disabled={!selectedDates} //пока даты не выбраны, кнопка неактивна
        >
          Сделать запрос
        </Button>
      </Card>
    </Layout>
  )
};