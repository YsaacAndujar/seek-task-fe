import { Layout, theme } from "antd"
import { Content } from "antd/es/layout/layout"
import { useState } from "react"
import { contentStyle, divContainerStyle, layoutStyle } from "../styles/layoutStyles"
import { Login, Signin } from "../components"

export const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={layoutStyle}>
      <Content style={contentStyle}>
        <div
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            ...divContainerStyle
          }}
        >
          {
            isLogin? <Login onChangeLogin={setIsLogin} /> : <Signin onChangeLogin={setIsLogin} />
          }
        </div>
      </Content>
    </Layout>
  )
}
