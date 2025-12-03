
import './App.css'
import { Flex, Layout } from 'antd';


const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minWidth: '100vw',
  minHeight: '100vh',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
};


const App: React.FC = () => (
  <Flex gap="middle">
    <Layout>
      <Layout.Content style={contentStyle}>Content</Layout.Content>
    </Layout>
  </Flex>
  );

export default App;
