import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import RoomForm from './RoomForm'

const AdminDashboard = () => {
  const [rooms, setRooms] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingRoom, setEditingRoom] = useState(null)

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch('/api/rooms')
      const data = await response.json()
      setRooms(data)
    }
    fetchRooms()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      await fetch(`/api/rooms/${id}`, { method: 'DELETE' })
      setRooms(rooms.filter(room => room._id !== id))
    }
  }

  const handleFormSubmit = (room) => {
    if (editingRoom) {
      setRooms(rooms.map(r => r._id === room._id ? room : r))
    } else {
      setRooms([...rooms, room])
    }
    setShowForm(false)
    setEditingRoom(null)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => {
            setEditingRoom(null)
            setShowForm(true)
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <Plus className="mr-2" /> Add Room
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map(room => (
          <div key={room._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img
                src={room.images[0] || 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38'}
                alt={room.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{room.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{room.description}</p>
              <div className="flex justify-between">
                <span className="font-bold text-blue-600">${room.pricePerHour}/hr</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingRoom(room)
                      setShowForm(true)
                    }}
                    className="p-2 text-blue-600 hover:text-blue-800"
                  >
                    <Edit />
                  </button>
                  <button
                    onClick={() => handleDelete(room._id)}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <RoomForm
          room={editingRoom}
          onSubmit={handleFormSubmit}
          onClose={() => {
            setShowForm(false)
            setEditingRoom(null)
          }}
        />
      )}
    </div>
  )
}

export default AdminDashboard
