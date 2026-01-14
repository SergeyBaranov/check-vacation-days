import React, { useState, useEffect } from 'react';
import './App.css'
import { Flex, Layout } from 'antd';
import { TopTitle } from './components/top-title/TopTitle';
import { DaysInputCard } from './components/days-input/DaysInputCard';
import { DatePeriod } from './components/date-period/DatePeriod';
import { ShowVacationdatesCard } from './components/show-vacations-dates/ShowVacationdatesCard';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';


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
  const [plannedVacationDays, setPlannedVacationDays] = useState<string[]>(() => {
    const saved = localStorage.getItem('plannedVacationDays');
    return saved ? JSON.parse(saved) : [];
  });
  const [rfDays, setRfDays] = useState(() => {
    const saved = localStorage.getItem('rfDays');
    return saved ? JSON.parse(saved) : 28;
  });
  const [vacationStart, setVacationStart] = useState(() => {
    const saved = localStorage.getItem('vacationStart');
    return saved ? JSON.parse(saved) : '';
  });
  const [vacationEnd, setVacationEnd] = useState(() => {
    const saved = localStorage.getItem('vacationEnd');
    return saved ? JSON.parse(saved) : '';
  });

  useEffect(() => {
    localStorage.setItem('plannedVacationDays', JSON.stringify(plannedVacationDays));
  }, [plannedVacationDays]);

  useEffect(() => {
    localStorage.setItem('rfDays', JSON.stringify(rfDays));
  }, [rfDays]);

  useEffect(() => {
    localStorage.setItem('vacationStart', JSON.stringify(vacationStart));
  }, [vacationStart]);

  useEffect(() => {
    localStorage.setItem('vacationEnd', JSON.stringify(vacationEnd));
  }, [vacationEnd]);

  const handleDateChange = (data: { dates: string[], start: string, end: string }) => {
    setPlannedVacationDays(data.dates);
    setVacationStart(data.start);
    setVacationEnd(data.end);
  };
  const handleSendVacation = () => {
    // уменьшение доступных дней на количество запланированных
    setRfDays((prev: number) => prev - plannedVacationDays.length);
    console.log('Запрос на отпуск отправлен');
  }

  return (
    <Flex gap="middle">
      <Layout>
        
        <Layout.Content style={contentStyle}>
          <TopTitle />
          <Layout style={{ display: 'flex', flexDirection: 'row', gap: '2rem', background: 'transparent', justifyContent: 'center' }}>
            <DaysInputCard value={rfDays} setValue={setRfDays} />
            <ConfigProvider locale={ruRU}>
              <DatePeriod 
                onChange={handleDateChange}
              />
            </ConfigProvider>
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
