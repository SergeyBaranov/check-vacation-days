import React from 'react';
import { Layout, Card, Typography, Alert, Button, notification  } from 'antd';
import dayjs from 'dayjs';

const { Paragraph, Title, Text} = Typography;

interface ShowVacationdatesCardProps {
  rfDays: number;
  plannedVacationDays?: string[];
  vacationStart?: string;
  vacationEnd?: string;
  onSend?: () => void;
}


export const ShowVacationdatesCard: React.FC<ShowVacationdatesCardProps> = ({
    rfDays,
    plannedVacationDays = [],
    vacationStart,
    vacationEnd,
    onSend,
  }) => {

  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  {/**проверяем что количество дней меньше или равно дням по ТК РФ и если условие верно - показываем или показываем с ошибкой*/}
  const plannedDaysCount = plannedVacationDays.length;
  const isDaysExceeded = (plannedDaysCount) > rfDays;

  // получаем диапазон дат выбранных в календаре
  // const startDate = plannedVacationDays[0] ? dayjs(plannedVacationDays[0]).format('DD.MM.YYYY') : null;
  // const endDate = plannedVacationDays[1] ? dayjs(plannedVacationDays[1]).format('DD.MM.YYYY') : null;

  const startDate = vacationStart
  ? dayjs(vacationStart).format('DD.MM.YYYY')
  : null;

  const endDate = vacationEnd
    ? dayjs(vacationEnd).format('DD.MM.YYYY')
    : null;

  const handleSend = () => {
    notification.success({
      message: 'Успешно',
      description: 'Ваш запрос на отпуск отправлен в отдел кадров.',
      placement: 'topRight',
      title: '',
    });

    setIsButtonDisabled(true); // блокируем кнопку после отправки
    onSend?.();
  };

  React.useEffect(() => {
    // Если пользователь изменил даты в календаре, кнопка снова становится активной
    setIsButtonDisabled(false);
  }, [plannedVacationDays, vacationStart, vacationEnd]);

  return (
  
    <Layout style={{ maxWidth: '300px', background: 'transparent', textAlign: 'left', gap: '1rem' }}>
      
      {plannedVacationDays.length === 0 ? (
        <Card>
          <Alert
            title="У вас нет запланированного отпуска"
            description="Выберите даты отпуска в календаре, чтобы увидеть детали."
            type="info"
            showIcon
          />
        </Card>
      ) : (
        <Card>
          <Paragraph>
            <Text type="secondary">
              Запланированное количество дней отпуска
            </Text>
            <Title
              level={1}
              style={{
                margin: '0',
                color: isDaysExceeded ? 'red' : undefined}}>
              {plannedVacationDays.length} {/* подсчитываем сколько дней запланировано в календаре в отпуск */}
            </Title>
            {/* выводим диапазон дней */}
            {startDate && endDate && (
              <Paragraph style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                Запланированный отпуск с {startDate} по {endDate}
              </Paragraph>
            )}
          </Paragraph>
          {/* проверяем что количество дней меньше или равно дням по ТК РФ */}
          {isDaysExceeded && (
            <Alert
              description="Количество запланированных дней превышает допустимое количество дней по ТК РФ. Выберите другие даты или обновите количество дней отпуска."
              type="error"
              showIcon
            />
          )}
          {/* кнопка будет работать только если количество дней в днях оидаемого и планируемого отпуска не будет равно 0 */}
          <Button
            type="primary"
            onClick={handleSend}
            disabled={isDaysExceeded || plannedDaysCount === 0 || isButtonDisabled}
            style={{ width: '100%' }}
          >
            Отправить запрос
          </Button>
          
        </Card>
      )}
    </Layout>
  )
};

