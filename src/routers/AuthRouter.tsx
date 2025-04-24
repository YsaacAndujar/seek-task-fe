import { AuthScreen } from "modules/auth"
import { Navigate, Route, Routes } from "react-router-dom"

export const AuthRouter = () => {
  return (
    <Routes>
        <Route index element={ <AuthScreen />} />
        <Route path="*" element={ <Navigate to="/auth"/> }/>
    </Routes>
  )
}
