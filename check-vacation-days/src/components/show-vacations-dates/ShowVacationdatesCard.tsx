import React from 'react';
import { Layout, Card, Typography } from 'antd';

const { Paragraph, Title } = Typography;

interface ShowVacationdatesCardProps {
  ukgDays: number;
  rfDays: number;
}

export const ShowVacationdatesCard: React.FC<ShowVacationdatesCardProps> = ({ukgDays, rfDays}) => (
  <>
    <Layout style={{ maxWidth: '300px', background: 'transparent', textAlign: 'left' }}>
      <Card>
        <Paragraph>
          Количество свободных дней по UKG
        </Paragraph>
        <Title level={1} style={{margin: '0'}}>
          {ukgDays || 0}
        </Title>
        <Paragraph>
          Количество свободных дней по ТК РФ
        </Paragraph>
        <Title level={1} style={{margin: '0'}}>
          {rfDays || 0}
        </Title>
      </Card>
    </Layout>
  </>
)

