import React from 'react';
import { Layout, Card, Typography } from 'antd';

const { Paragraph, Title } = Typography;

interface ShowVacationdatesCardProps {
  days: string;
}

export const ShowVacationdatesCard: React.FC<ShowVacationdatesCardProps> = ({days}) => (
  <>
    <Layout style={{ maxWidth: '300px', background: 'transparent', textAlign: 'left' }}>
      <Card>
        <Paragraph>
          Количество свободных дней
        </Paragraph>
        <Title level={1} style={{margin: '0'}}>
          {days || 0}
        </Title>
      </Card>
    </Layout>
  </>
)

