import { Button, Col, Form, Row, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { TaskValuesForm } from "../components/TaskValuesForm";
import { useTaskDetails } from "../hooks/useTaskDetails";
const { Title, } = Typography;

export const TaskDetailsScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) {
    navigate('/tasks')
  }
  const { task, form, isEdit, setIsEdit, onCancelEdit, onSubmit, onDeleteClick } = useTaskDetails(id || '0')

  return (
    <>
      <Title level={2}>Details</Title>
      <Form
        name="basic"
        size="large"
        initialValues={task}
        form={form}
        onFinish={onSubmit}
        style={{ padding: '20px' }}
        labelCol={{ span: 5, offset: 0 }}
      >
        <TaskValuesForm isView={!isEdit} />

        <Row justify="end" gutter={16} >
          {
            !isEdit &&
            <>
              <Col>
                <Form.Item>
                  <Button size="large" danger onClick={onDeleteClick}>
                    Delete
                  </Button>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button size="large" onClick={() => { navigate('/tasks') }}>
                    Cancel
                  </Button>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button type="primary" size="large" onClick={() => setIsEdit(true)}>
                    Edit
                  </Button>
                </Form.Item>
              </Col>
            </>
          }
          {
            isEdit &&
            <>
              <Col>
                <Form.Item>
                  <Button size="large" htmlType="reset" onClick={onCancelEdit}>
                    Cancel
                  </Button>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button type="primary" size="large" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Col>
            </>
          }
        </Row>
      </Form>
    </>
  )
}
