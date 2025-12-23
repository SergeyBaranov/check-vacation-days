import React, { useState } from 'react';
import './App.css'
import { Flex, Layout } from 'antd';
import { TopTitle } from './components/top-title/TopTitle';
import { DaysInputCard } from './components/days-input/DaysInputCard';
import { DatePeriod } from './components/date-period/DatePeriod';
import { ShowVacationdatesCard } from './components/show-vacations-dates/ShowVacationdatesCard';


const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minWidth: '100vw',
  minHeight: '100vh',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#27292b ',
  padding: 100,
};


const App: React.FC = () => {
  const [plannedVacationDays, setPlannedVacationDays] = useState<string[]>([]);
  const [rfDays] = useState(28); // временное значение
  const [vacationStart, setVacationStart] = useState<string>('');
  const [vacationEnd, setVacationEnd] = useState<string>('');

  const handleDateChange = (data: { dates: string[], start: string, end: string }) => {
    setPlannedVacationDays(data.dates);
    setVacationStart(data.start);
    setVacationEnd(data.end);
  };
  const handleSendVacation = () => {
    // Логика отправки запроса на отпуск может быть реализована здесь
    console.log('Запрос на отпуск отправлен');
  }

  return (
    <Flex gap="middle">
      <Layout>
        
        <Layout.Content style={contentStyle}>
          <TopTitle />
          <Layout style={{  display: 'flex', flexDirection: 'row', gap: '2rem', background: 'transparent', justifyContent: 'center' }}>
            <DaysInputCard
            />
            
            <DatePeriod 
              onChange={handleDateChange}
            />
            <ShowVacationdatesCard
              rfDays={rfDays}
              plannedVacationDays={plannedVacationDays}
              vacationStart={vacationStart}
              vacationEnd={vacationEnd}
              onSend={handleSendVacation}
            />
          </Layout>
        </Layout.Content>
      </Layout>
    </Flex>
  )
  };

export default App;
