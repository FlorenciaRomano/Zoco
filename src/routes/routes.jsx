import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import PrivateRoute from './privateRoutes'
import UserManagement from '../pages/UserManagement'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } 
      />
      <Route path="/usuarios" element={<UserManagement/>} />
    </Routes>
  )
}

export default AppRouter