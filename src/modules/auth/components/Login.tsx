import { Button, Checkbox, Col, Form, Input, Row, Typography } from "antd";
import { Dispatch, SetStateAction } from "react";
import { requiredMsg } from "utils/form";
import { useAuth } from "../hooks/useAuth";
const { Title, Text, Link } = Typography;

interface LoginProps {
  onChangeLogin: Dispatch<SetStateAction<boolean>>
}

export const Login = ({ onChangeLogin }: LoginProps) => {
  const { startLogin } = useAuth()
  return (
    <>
      <Title level={2}>Login</Title>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        style={{ padding: '20px' }}
        onFinish={startLogin}
        labelCol={{ span: 5, offset: 0 }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: requiredMsg }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: requiredMsg }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 5 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Row justify="end" style={{marginTop:'-30px'}}>
            <Form.Item>
              <Text>
                Don't have an account? <Link onClick={() => { onChangeLogin(false) }}>Click here</Link>
              </Text>
            </Form.Item>
        </Row>
        <Row justify="end">
          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large">
                Login
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}
