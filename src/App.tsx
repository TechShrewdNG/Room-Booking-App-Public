import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'
import RoomDetail from './components/Room/RoomDetail'
import Navbar from './components/Layout/Navbar'
import PrivateRoute from './components/Auth/PrivateRoute'
import AdminRoute from './components/Auth/AdminRoute'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rooms/:id" element={<RoomDetail />} />
        <Route path="/admin" element={
          <PrivateRoute>
            <AdminRoute>
              <Admin />
            </AdminRoute>
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
