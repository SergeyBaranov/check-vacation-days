import React from 'react';
import { Card, Layout, InputNumber, Typography, Button, Tooltip } from 'antd';

const { Text, Paragraph } = Typography;

interface DaysInputCardProps {
  ukgValue: number;
  rfValue: number;
  onUkgChange: (value: number) => void;
  onRfChange: (value: number) => void;
  onSubmit?: () => void;
}


export const DaysInputcard: React.FC<DaysInputCardProps> = ({
    ukgValue,
    rfValue,
    onUkgChange,
    onRfChange,
    onSubmit
  }) => (
  <>
    <Layout style={{ maxWidth: '300px', background: 'transparent', textAlign: 'left' }}>
      <Card >
        <Paragraph>
          Введите количество дней которые отображены у вас в аккаунте UKG
        </Paragraph>
        <Tooltip title="Максимум: 24 дня">
          <InputNumber 
            min={0}
            max={Math.min(rfValue ?? 24, 24)}
            placeholder="Введите количество дней"
            style={{margin: '0 0 1rem 0'}}
            value={ukgValue}
            onChange={(val) => {
              if (typeof val === "number") onUkgChange(val);
            }}
          />
        </Tooltip>
        <Paragraph>
          <Text type="secondary" >
            Для автоматического подсчета свободных дней для отпуска сравните количество дней с производственным календарем
          </Text>
        </Paragraph>
        <Paragraph>
          Введите количество дней которые осталось у вас по ТК рФ
        </Paragraph>
        {/* <Checkbox>Учитывать производственный календарь</Checkbox> */}
        <Tooltip title="Максимум: 28 дней">
          <InputNumber 
            min={0}
            max={28}
            placeholder="Введите количество дней"
            style={{margin: '0 0 1rem 0'}}
            value={rfValue}
            onChange={(val) => {
              if (typeof val === "number") onRfChange(val);
            }}
          />
        </Tooltip>
        <Button
          disabled={!ukgValue || !rfValue}
          type="primary"
          style={{width: '100%', marginTop: '1.5rem'}}
          onClick={onSubmit}
        >
          Передать количество дней
        </Button>

        {/* добавляем подсказку что надо сделать если поля не введены */}
        {(ukgValue == null || rfValue == null) && (
          <Text type="danger" style={{ display: 'block', marginTop: '0.5rem' }}>
            {ukgValue == null && rfValue == null && "Заполните оба поля, чтобы продолжить"}
            {ukgValue == null && rfValue != null && "Введите количество дней в UKG"}
            {rfValue == null && ukgValue != null && "Введите количество дней по ТК РФ"}
          </Text>
        )}
      </Card>
    </Layout>
  </>
)