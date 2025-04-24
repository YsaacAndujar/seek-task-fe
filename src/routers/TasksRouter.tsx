import { TaskAddScreen, TaskDetailsScreen, TasksListScreen } from "modules/tasks"
import { Navigate, Route, Routes } from "react-router-dom"

export const TasksRouter = () => {
  return (
    <Routes>
      <Route index element={<TasksListScreen />} />
      <Route path="/:id" element={<TaskDetailsScreen />} />
      <Route path="/add" element={<TaskAddScreen />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
