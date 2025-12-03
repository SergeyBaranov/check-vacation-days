import React from 'react';
import './App.css'
import { Flex, Layout } from 'antd';
import { DaysInputcard } from './components/days-input/DaysInputCard';
import { TopTitle } from './components/top-title/TopTitle';
import { DatePeriod } from './components/date-period/DatePeriod';


const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minWidth: '100vw',
  minHeight: '100vh',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#27292b ',
  padding: 100,
};


const App: React.FC = () => (
  <Flex gap="middle">
    <Layout>
      
      <Layout.Content style={contentStyle}>
        <TopTitle />
        <Layout style={{  display: 'flex', flexDirection: 'row', gap: '2rem', background: 'transparent', justifyContent: 'center' }}>
          <DaysInputcard />
          <DatePeriod />
        </Layout>
      </Layout.Content>
    </Layout>
  </Flex>
  );

export default App;
