import React from 'react';
import { Typography  } from 'antd';

const { Title } = Typography;

export const TopTitle: React.FC = () => (
  <>
    <Title level={2} style={{color: '#fff', marginBottom: '2rem', textAlign: 'left'}}>Дни отпуска</Title>
  </>
)