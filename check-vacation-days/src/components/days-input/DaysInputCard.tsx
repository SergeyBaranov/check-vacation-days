import React, { useState  } from 'react';
import { Card, Layout, InputNumber, Typography, Space, Flex } from 'antd';
import { EditOutlined } from '@ant-design/icons';


interface DaysInputCardProps {
  value: number;
  setValue: (val: number) => void;
}

const { Text, Title } = Typography;

export const DaysInputCard: React.FC<DaysInputCardProps> = ({ value, setValue }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftValue, setDraftValue] = useState(value);

  const startEditing = () => {
    setDraftValue(value);
    setIsEditing(true);
  };

  const finishEditing = () => {
    setValue(draftValue);
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setDraftValue(value);
    setIsEditing(false);
  };
  

  return (
    <Layout style={{ maxWidth: 300, background: 'transparent', marginBottom: '1rem' }}>
      <Card>
        <Space vertical size="middle" style={{ width: '100%', textAlign: 'left' }}>
          {/* Число / инпут */}
          <Flex align="center" gap={8}>
            {!isEditing ? (
              <>
                <Title level={1} style={{ fontSize: 48, margin: 0 }}>
                  {value}
                </Title>
                <EditOutlined
                  style={{ fontSize: 20, cursor: 'pointer', color: '#1677ff' }}
                  onClick={startEditing}
                />
              </>
            ) : (
              <InputNumber
                min={0}
                max={28}
                value={draftValue}
                autoFocus
                onChange={(val) => typeof val === 'number' && setDraftValue(val)}
                onBlur={finishEditing}
                style={{
                  fontSize: 48,
                  lineHeight: '1',
                  padding: 0,
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    finishEditing();
                  }
                  if (e.key === 'Escape') {
                    cancelEditing();
                  }
                }}
              />
            )}
          </Flex>

          <Text style={{textAlign: 'left'}}>
            Количество дней отпуска в текущем году
          </Text>
        </Space>
      </Card>
    </Layout>
  );
};
