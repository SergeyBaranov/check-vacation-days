import React from 'react';
import { Layout, Typography  } from 'antd';
import { UserAvatar } from '../user/UserAvatar';
import { useState, useEffect} from 'react';

const { Title, Paragraph, Text } = Typography;


export const TopTitle: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);

  // При загрузке компонента проверяем token в localStorage
  useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        fetch('http://localhost:3000/api/profile', {  // адрес сервера
          headers: { 'Authorization': 'Bearer ' + token }
        })
          .then(res => {
            if (!res.ok) throw new Error('Неверный токен');
            return res.json();
          })
          .then(data => {
            setUser(data.username); // сохраняем имя пользователя
          })
          .catch(err => {
            console.error(err);
            localStorage.removeItem('token'); // удаляем недействительный токен
          });
      }
    }, []);

  return <>
    <Layout style={{background: 'transparent', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
      <Title level={2} style={{color: '#fff', textAlign: 'left', width: '100%'}}>Дни отпуска</Title>
      {/* Передаём user и функцию для обновления после логина */}
        <UserAvatar onLogin={(username, token ) => {
          localStorage.setItem('token', token);
          setUser(username);
        }} onLogout={() => {
          localStorage.removeItem('token');
          setUser(null);
        }} user={user ?? undefined} />
      {/* <UserAvatar onLogin={setUser} user={user ?? undefined} /> */}
    </Layout>
    <Paragraph style={{textAlign: 'left',  marginBottom: '2rem'}}>
      <Text type="secondary" style={{color: '#fff'}}>
        Обратите внимание, что количество дней отпуска по ТК РФ может отличаться от количества дней, предоставляемых системой UKG. Поскольку система UKG не учитывает выходные дни и праздничные дни при расчете отпускных дней, в то время как Трудовой кодекс Российской Федерации предусматривает их включение в общий отпускной период.
      </Text>
    </Paragraph>
  </>
}