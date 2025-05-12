import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/protectedRoute'
import ErrorBoundary from './components/ErrorBoundary';
import UserManagement from './pages/UserManagement'

function App() {
  return (
    <ErrorBoundary>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute requiredRole="admin">
                <UserManagement/>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/usuarios" 
            element={
              <ProtectedRoute requiredRole="admin">
                <UserManagement/>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
    </ErrorBoundary>
  )
}

export default App