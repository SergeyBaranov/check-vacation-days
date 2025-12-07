import React from 'react';
import { Typography  } from 'antd';

const { Title, Paragraph, Text } = Typography;

export const TopTitle: React.FC = () => (
  <>
    <Title level={2} style={{color: '#fff', textAlign: 'left'}}>Дни отпуска</Title>
    <Paragraph style={{textAlign: 'left',  marginBottom: '2rem'}}>
      <Text type="secondary" style={{color: '#fff'}}>
        Обратите внимание, что количество дней отпуска по ТК РФ может отличаться от количества дней, предоставляемых системой UKG. Поскольку система UKG не учитывает выходные дни и праздничные дни при расчете отпускных дней, в то время как Трудовой кодекс Российской Федерации предусматривает их включение в общий отпускной период.
      </Text>
    </Paragraph>
  </>
)