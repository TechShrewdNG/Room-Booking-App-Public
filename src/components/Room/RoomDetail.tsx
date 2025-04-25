import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Calendar, Clock, MapPin, Users, ArrowLeft } from 'lucide-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import PaymentModal from '../Payment/PaymentModal'

const RoomDetail = () => {
  const { id } = useParams()
  const [room, setRoom] = useState(null)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const fetchRoom = async () => {
      const response = await fetch(`/api/rooms/${id}`)
      const data = await response.json()
      setRoom(data)
    }
    fetchRoom()
  }, [id])

  useEffect(() => {
    if (room) {
      const hours = (endDate - startDate) / (1000 * 60 * 60)
      setTotalPrice(hours * room.pricePerHour)
    }
  }, [startDate, endDate, room])

  const handleBooking = () => {
    setShowPaymentModal(true)
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <button
        onClick={() => window.history.back()}
        className="flex items-center mb-4 text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft className="mr-2" /> Back to Rooms
      </button>

      {room && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-6 rounded-lg overflow-hidden">
              <img
                src={room.images[0] || 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38'}
                alt={room.title}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {room.images.slice(1).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${room.title} ${i + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">{room.title}</h1>
            <div className="flex items-center mb-4">
              <MapPin className="w-5 h-5 mr-2 text-blue-500" />
              <span className="text-gray-700">{room.location}</span>
            </div>
            <div className="flex items-center mb-4">
              <Users className="w-5 h-5 mr-2 text-blue-500" />
              <span className="text-gray-700">Capacity: {room.capacity}</span>
            </div>
            <p className="text-gray-700 mb-6">{room.description}</p>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h2 className="text-xl font-semibold mb-4">Book This Room</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="inline mr-2" /> Start Time
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={60}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Clock className="inline mr-2" /> End Time
                  </label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={60}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-blue-600">${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={handleBooking}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <PaymentModal
          amount={totalPrice}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={() => {
            setShowPaymentModal(false)
            // Handle successful payment
          }}
        />
      )}
    </div>
  )
}

export default RoomDetail
