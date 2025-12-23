import React, { useState } from 'react';
import { Card, Layout, InputNumber, Typography, Button, Space } from 'antd';

const { Text, Title } = Typography;

export const DaysInputCard: React.FC = () => {
  const [value, setValue] = useState<number>(28);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Layout style={{ maxWidth: 300, background: 'transparent' }}>
      <Card>
        {!isEditing ? (
          <Space align="center" style={{ display: 'flex', flexDirection: 'column', alignContent: 'left', gap: '1rem',  width: '100%' }}>
            <Title level={1} style={{fontSize: '48px', margin: 0}}>{value}</Title>
            <Text > Количество дней отпуска в текущем году</Text>
            <Button
              type="primary"
              onClick={() => setIsEditing(true)}
              style={{ width: '100%' }}
            >
              Редактировать
            </Button>
          </Space>
        ) : (
          <Space align="center" style={{ display: 'flex', flexDirection: 'column', alignContent: 'left', gap: '1rem' }}>
            <InputNumber
              min={0}
              max={28}
              value={value}
              autoFocus
              onChange={(val) => {
                if (typeof val === 'number') setValue(val);
              }}
              onBlur={() => setIsEditing(false)}
            />
            <Text >Количество дней отпуска в текущем году</Text>
            <Button
              type="primary"
              onClick={() => setIsEditing(false)}
              style={{ width: '100%' }}
            >
              Сохранить
            </Button>
          </Space>
        )}
      </Card>
    </Layout>
  );
};
