import { Button, Col, Form, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useTaskAdd } from "../hooks/useTaskAdd";
import { TaskValuesForm } from "../components/TaskValuesForm";
const { Title, } = Typography;

export const TaskAddScreen = () => {
  const { form, onSubmit } = useTaskAdd()
  const navigate = useNavigate()
  return (
    <>
      <Title level={2}>Add</Title>
      <Form
        name="basic"
        size="large"
        form={form}
        onFinish={onSubmit}
        style={{ padding: '20px' }}
        labelCol={{ span: 5, offset: 0 }}
        initialValues={{status: 'todo'}}
      >
        <TaskValuesForm />
        <Row justify="end" gutter={16} >
          <Col>
            <Form.Item>
              <Button size="large" onClick={() => { navigate('/tasks') }}>
                Cancel
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button type="primary" size="large" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}
