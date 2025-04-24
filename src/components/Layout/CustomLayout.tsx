import { Grid, Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { ReactNode, useContext } from "react";
import './customLayout.css';
import { Link } from "react-router-dom";
import { AuthContext } from "context/auth";
const { useBreakpoint } = Grid;

interface CustomLayoutProps {
  children: ReactNode;
}

export const CustomLayout = ({ children }: CustomLayoutProps) => {
  const screens = useBreakpoint();
  const { logOut } = useContext(AuthContext)
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ flex: 1, minWidth: 0 }}
          key={0}
        >
          <Menu.Item>
            <Link to='/tasks'>Tasks</Link>
          </Menu.Item>
          <Menu.Item onClick={logOut} style={{ marginLeft: 'auto' }}>
            Log Out
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: screens.xs ? '20px 16px' : '50px 48px' }}>
        <div
          style={{
            background: 'white',
            minHeight: 280,
            padding: 24,
            borderRadius: '25px',
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  )
}
