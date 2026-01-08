import React from 'react';
import { Card, Layout, Typography, DatePicker, Button } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import 'dayjs/locale/ru';
dayjs.locale('ru');

interface CalendarDay {
  date: string;
  type_id: number;
  type_text: string;
}

interface DatePeriodProps {
  onChange: (data: { dates: string[], start: string, end: string }) => void;
}

const {Paragraph } = Typography;
const { RangePicker } = DatePicker;

export const DatePeriod: React.FC<DatePeriodProps> = ({ onChange }) => {
  const [selectedDates, setSelectedDates] = React.useState<[Dayjs, Dayjs] | null>(null);
  const [showWorkCalendar, setShowWorkCalendar] = React.useState(false);


  // обработка изменения выбранных дат
  const handleChange = (dates: [Dayjs | null, Dayjs | null] | null): void => {
    if (dates && dates[0] && dates[1]) {
      setSelectedDates([dates[0], dates[1]]);
      setRequestSent(false); // ⬅️ сбрасываем статус
    } else {
      setSelectedDates(null);
      setRequestSent(false);
    }
  };

  // не даем пользователю выбирать дату перед текущей датой
  const disabledDate = (current: Dayjs) => {
    return current && current < dayjs().startOf('day');
  };  

  // дизаблим кнопку "Сделать запрос" после того, как пользователь уже нажимал на нее
  const [requestSent, setRequestSent] = React.useState(false);

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

    setRequestSent(true); // дизаблим кнопку после отправки
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
    setShowWorkCalendar(e.target.checked);
  };

  const [calendarData, setCalendarData] = React.useState<CalendarDay[]>([]);
  const [loading, setLoading] = React.useState(false);

  const fetchProdCalendar = async (start: Dayjs, end: Dayjs) => {
    setLoading(true);
    try {
      const period = `${start.format('DD.MM.YYYY')}-${end.format('DD.MM.YYYY')}`;

      const response = await fetch(
        `https://production-calendar.ru/get-period/4bcdc1fe5be5da09d3938e2cf6f69bb5/ru/${period}/json`
      );

      const data = await response.json();
      setCalendarData(data.days || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (showWorkCalendar && selectedDates) {
      fetchProdCalendar(selectedDates[0], selectedDates[1]);
    }
  }, [showWorkCalendar, selectedDates]);

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
        
        <Checkbox 
          onChange={handleCheckboxChange}
          style={{marginBottom: '1rem'}}
        >
          Показать производственный календарь на выбранный период дат
        </Checkbox>

        {showWorkCalendar && (
          <Card size="small" style={{ marginBottom: '1rem', background: '#fafafa' }}>
            <Paragraph strong>Производственный календарь</Paragraph>

            {loading && <Paragraph>Загрузка…</Paragraph>}

            {!loading && calendarData.map((day) => (
              <div key={day.date} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{day.date}</span>
                <span style={{ color: day.type_id !== 1 ? 'red' : 'green' }}>
                  {day.type_text}
                </span>
              </div>
            ))}
          </Card>
        )}
        {/* кнопка для передачи диапазона дат в поле аппрува */}
        <Button
          type="primary"
          style={{ width: '100%' }}
          onClick={handleButtonClick}
          disabled={!selectedDates || requestSent}
        >
          Сделать запрос
        </Button>
      </Card>
    </Layout>
  )
};