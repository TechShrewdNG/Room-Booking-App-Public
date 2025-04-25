import express from 'express'
import { createBooking, getUserBookings } from '../models/Booking.js'
import auth from '../middleware/auth.js'

const router = express.Router()

// Create booking
router.post('/', auth, async (req, res) => {
  try {
    const { roomId, startTime, endTime } = req.body
    const hours = (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60)
    
    const bookingData = {
      user_id: req.user.id,
      room_id: roomId,
      start_time: startTime,
      end_time: endTime,
      total_price: req.body.totalPrice || 0
    }

    const { data: booking, error } = await createBooking(bookingData)
    if (error) throw error
    res.status(201).json(booking)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get user bookings
router.get('/', auth, async (req, res) => {
  try {
    const { data: bookings, error } = await getUserBookings(req.user.id)
    if (error) throw error
    res.json(bookings)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
