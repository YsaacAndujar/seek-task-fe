import { Button, Row, Table, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useTasksList } from "../hooks/useTasksList.tsx";
import { TaskPieChart } from "../components/TaskPieChart.tsx";
const { Title, } = Typography;

export const TasksListScreen = () => {
  const { columns, tasks, pagination, onPaginationChange } = useTasksList()
  const navigate = useNavigate()
  return (
    <>
      <Title level={2}>Tasks</Title>
      <Row justify='center' style={{ marginBottom: '25px' }}>
        <TaskPieChart />
      </Row>
      <Row justify='end' style={{ marginBottom: '25px' }}>
        <Button type="primary" size="large" onClick={() => { navigate('add') }}>Add</Button>
      </Row>
      <Table columns={columns} dataSource={tasks} rowKey="id" pagination={{ ...pagination, onChange: onPaginationChange }} />
    </>
  )
}
