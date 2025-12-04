import React from 'react';
import { Card, Layout, Input, Typography, Checkbox, Button } from 'antd';

const { Text, Paragraph } = Typography;

interface DaysInputCardProps {
  value?: number;
  onChange?: (value: number) => void;
  onSubmit?: () => void;
}


export const DaysInputcard: React.FC<DaysInputCardProps> = ({value, onChange, onSubmit}) => (
  <>
    <Layout style={{ maxWidth: '300px', background: 'transparent', textAlign: 'left' }}>
      <Card >
        <Paragraph>
          Введите количество дней которые отображены у вас в аккаунте UKG
        </Paragraph>
        <Input 
          placeholder="Введите количество дней"
          style={{margin: '0 0 1rem 0'}}
          value={value}
          onChange={(e) => {

            const maxVacationDays = Number(e.target.value);
            //ограничиваем максимальное число
            if (maxVacationDays <= 24) {
              onChange?.(maxVacationDays);
            }
          }}

        />
        <Paragraph>
          <Text type="secondary" >
            Для автоматического подсчета свободных дней для отпуска сравните количество дней с производственным календарем
          </Text>
        </Paragraph>
        <Checkbox>Учитывать производственный календарь</Checkbox>
        <Button
          type="primary"
          style={{width: '100%', marginTop: '1.5rem'}}
          onClick={onSubmit}
        >
          Рассчитать
        </Button>
      </Card>
    </Layout>
  </>
)