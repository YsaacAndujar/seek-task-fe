import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useAppSelector } from "store";
import { AuthRouter, OnlyPublicRoute, PrivateRoute, TasksRouter, } from "./index";

export const AppRouter = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute isAuthenticated={isLoggedIn} />}>
          <Route path="/tasks/*" element={<TasksRouter />} />
        </Route>
        <Route element={<OnlyPublicRoute isAuthenticated={isLoggedIn} />}>
          <Route path="/auth/*" element={<AuthRouter />} />
        </Route>
        <Route path="*" element={<Navigate to="/tasks" />} />
      </Routes>
    </Router>
  )
}
