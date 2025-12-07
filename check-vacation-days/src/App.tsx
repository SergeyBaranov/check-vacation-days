import React from 'react';
import './App.css'
import { Flex, Layout } from 'antd';
import { DaysInputcard } from './components/days-input/DaysInputCard';
import { TopTitle } from './components/top-title/TopTitle';
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
  const [ukgDays, setUkgDays] = React.useState<number>(0);
  const [rfDays, setRfDays] = React.useState<number>(0);
  const [resultUkg, setResultUkg] = React.useState<number>(0);
  const [resultRf, setResultRf] = React.useState<number>(0);
  // const [vacationDays, setVacationDays] = React.useState<number>(0);
  // const [days, setDays] = React.useState<number>(0);

  const handleCalculateVacationDays = () => {
    setResultUkg(ukgDays);
    setResultRf(rfDays);
  };  

  return (
    <Flex gap="middle">
      <Layout>
        
        <Layout.Content style={contentStyle}>
          <TopTitle />
          <Layout style={{  display: 'flex', flexDirection: 'row', gap: '2rem', background: 'transparent', justifyContent: 'center' }}>
            <DaysInputcard
              ukgValue={ukgDays}
              rfValue={rfDays}
              onUkgChange={setUkgDays}
              onRfChange={setRfDays}
              onSubmit={handleCalculateVacationDays}
            />
            <DatePeriod />
            <ShowVacationdatesCard
              ukgDays={resultUkg}
              rfDays={resultRf}
            />
          </Layout>
        </Layout.Content>
      </Layout>
    </Flex>
  )
  };

export default App;
