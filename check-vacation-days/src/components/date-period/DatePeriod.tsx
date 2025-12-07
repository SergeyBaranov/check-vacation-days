import React from 'react';
import { Card, Layout, Typography, DatePicker, Checkbox, Button } from 'antd';
import type { CheckboxProps } from 'antd';

const {Paragraph } = Typography;
const { RangePicker } = DatePicker;
const onChange: CheckboxProps['onChange'] = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

export const DatePeriod: React.FC = () => (
  <>
    <Layout style={{ maxWidth: '100%', background: 'transparent', textAlign: 'left' }}>
      <Card style={{display: 'flex', flexDirection: 'column'}} >
         <Paragraph>
          Если вы хотите выбрать отпуск, выберите даты начала и окончания
        </Paragraph>
        <RangePicker style={{width: '100%', marginBottom: '1rem'}}/>
        
        <Checkbox onChange={onChange} style={{width: '100%', marginBottom: '1rem'}}>Использовать производственный календарь РФ</Checkbox>
        <Button type="primary" style={{width: '100%'}}>Сделать запрос</Button>
      </Card>
    </Layout>
  </>
);