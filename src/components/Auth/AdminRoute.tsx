import React from 'react'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({ children }) => {
  // In a real app, you would decode the JWT to check the user's role
  const user = { role: 'admin' } // Mock user data
  return user?.role === 'admin' ? children : <Navigate to="/" replace />
}

export default AdminRoute
