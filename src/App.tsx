import { Layout } from 'antd';
import { FC } from 'react';
import { RouteContent } from './routes';
import { SideMenu } from './SideMenu';
import './firebaseConfig';

const { Header, Content, Footer } = Layout;

const App: FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideMenu />
      <Layout className="site-layout">
        <Header className="site-layout-background" />
        <Content className="px-4 py-4">
          <RouteContent />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Absolute Teamsport IL
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
