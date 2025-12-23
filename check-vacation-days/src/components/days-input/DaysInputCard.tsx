import React, { useState } from 'react';
import { Card, Layout, InputNumber, Typography, Button, Space } from 'antd';

interface DaysInputCardProps {
  value: number;
  setValue: (val: number) => void;
}

const { Text, Title } = Typography;

export const DaysInputCard: React.FC<DaysInputCardProps> = ({ value, setValue }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Layout style={{ maxWidth: 300, background: 'transparent', marginBottom: '1rem' }}>
      <Card>
        {!isEditing ? (
          <Space
            align="center"
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}
          >
            <Title level={1} style={{ fontSize: '48px', margin: 0 }}>{value}</Title>
            <Text>Количество дней отпуска в текущем году</Text>
            <Button type="primary" onClick={() => setIsEditing(true)} style={{ width: '100%' }}>
              Редактировать
            </Button>
          </Space>
        ) : (
          <Space align="center" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <InputNumber
              min={0}
              max={28}
              value={value}
              autoFocus
              onChange={(val) => typeof val === 'number' && setValue(val)}
              onBlur={() => setIsEditing(false)}
            />
            <Text>Количество дней отпуска в текущем году</Text>
            <Button type="primary" onClick={() => setIsEditing(false)} style={{ width: '100%' }}>
              Сохранить
            </Button>
          </Space>
        )}
      </Card>
    </Layout>
  );
};
