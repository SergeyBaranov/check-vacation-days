import React from 'react';
import { Card, Layout, Input, Typography, Checkbox, Button } from 'antd';
import type { CheckboxProps } from 'antd';

const { Text, Paragraph } = Typography;
const onChange: CheckboxProps['onChange'] = (e) => {
  console.log(`checked = ${e.target.checked}`);
};


export const DaysInputcard: React.FC = () => (
  <>
    <Layout style={{ maxWidth: '300px', background: 'transparent', textAlign: 'left' }}>
      <Card >
        <Paragraph>
          Введите количество дней которые отображены у вас в аккаунте UKG
        </Paragraph>
        <Input placeholder="Введите количество дней" style={{margin: '0 0 1rem 0'}} />
        <Paragraph>
          <Text type="secondary" >
            Для автоматического подсчета свободных дней для отпуска сравните количество дней с производственным календарем
          </Text>
        </Paragraph>
        <Checkbox onChange={onChange}>Учитывать производственный календарь</Checkbox>
        <Button type="primary" style={{width: '100%', marginTop: '1.5rem'}}>Рассчитать</Button>
      </Card>
    </Layout>
  </>
)