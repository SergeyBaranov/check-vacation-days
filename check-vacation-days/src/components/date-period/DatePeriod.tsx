import React from 'react';
import { Card, Layout, Typography, DatePicker, Button } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

interface DatePeriodProps {
  onChange: (days: string[]) => void;
}

const {Paragraph } = Typography;
const { RangePicker } = DatePicker;

export const DatePeriod: React.FC<DatePeriodProps> = ({ onChange }) => {
  const [selectedDates, setSelectedDates] = React.useState<[Dayjs, Dayjs] | null>(null);

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

  const handleButtonClick = () => {
    if (!selectedDates) {
      onChange([]);
      return;
    }
    const [start, end] = selectedDates;
    const datesArray: string[] = [];
    let current = start;
    while (current.isBefore(end) || current.isSame(end, 'day')) {
      datesArray.push(current.format('YYYY-MM-DD'));
      current = current.add(1, 'day');
    }
    onChange(datesArray);
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
        />
        
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