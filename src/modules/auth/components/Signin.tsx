import { Dispatch, SetStateAction } from "react";
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { useAuth } from "../hooks/useAuth";
import { passwordMatchMsg, requiredMsg } from "utils/form";
const { Title, Text, Link } = Typography;

interface SigninProps {
  onChangeLogin: Dispatch<SetStateAction<boolean>>
}

export const Signin = ({ onChangeLogin }:SigninProps) => {
  const { startSignin } = useAuth()
  return (
    <>
      <Title level={2}>Sigin</Title>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        style={{ padding: '20px' }}
        labelCol={{ span: 5, offset:0 }}
        onFinish={({email, password}:{email:string, password:string})=> {
          startSignin({email, password})
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: requiredMsg, }, {type: "email", message: "Please enter a valid email address"}]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: requiredMsg }, {min: 6}]}
        >
          <Input.Password />
        </Form.Item>
        
        <Form.Item
          label="Confirm password"
          name="confirm"
          dependencies={['password']}
          rules={[
            { required: true, message: requiredMsg },
            ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(passwordMatchMsg));
            },
          }),]}
        >
          <Input.Password />
        </Form.Item>

        <Row justify="end">
          <Col>
            <Form.Item>
              <Text>
                Do you already have an account? <Link onClick={() => { onChangeLogin(true) }}>Click here</Link>
              </Text>
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Col>
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large">
                Sigin
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}
