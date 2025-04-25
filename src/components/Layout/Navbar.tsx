import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Calendar, User, LogIn, LogOut } from 'lucide-react'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // In a real app, you would verify the token and fetch user data
      setIsLoggedIn(true)
      setUser({ name: 'Admin', role: 'admin' }) // Mock user data
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUser(null)
    window.location.href = '/login'
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center text-xl font-bold text-blue-600">
          <Home className="mr-2" /> RoomBook
        </Link>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              {user?.role === 'admin' && (
                <Link to="/admin" className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600">
                  <User className="mr-2" /> Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                <LogOut className="mr-2" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600">
                <LogIn className="mr-2" /> Login
              </Link>
              <Link to="/register" className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
