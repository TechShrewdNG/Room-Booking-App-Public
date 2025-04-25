import React from 'react'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

interface RoomCardProps {
  room: {
    _id: string
    title: string
    description: string
    pricePerHour: number
    capacity: number
    location: string
    images: string[]
  }
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
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
        <div className="flex items-center mb-2">
          <MapPin className="w-4 h-4 mr-2 text-blue-500" />
          <span className="text-sm text-gray-600">{room.location}</span>
        </div>
        <div className="flex items-center mb-2">
          <Users className="w-4 h-4 mr-2 text-blue-500" />
          <span className="text-sm text-gray-600">Capacity: {room.capacity}</span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-blue-600">${room.pricePerHour}/hr</span>
          <Link
            to={`/rooms/${room._id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RoomCard
