import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthRouter, OnlyPublicRoute, PrivateRoute, TasksRouter, } from "./index";
import { useContext } from "react";
import { AuthContext } from "context/auth";

export const AppRouter = () => {
  const { isLogged } = useContext(AuthContext)
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute isAuthenticated={isLogged} />}>
          <Route path="/tasks/*" element={<TasksRouter />} />
        </Route>
        <Route element={<OnlyPublicRoute isAuthenticated={isLogged} />}>
          <Route path="/auth/*" element={<AuthRouter />} />
        </Route>
        <Route path="*" element={<Navigate to="/tasks" />} />
      </Routes>
    </Router>
  )
}
