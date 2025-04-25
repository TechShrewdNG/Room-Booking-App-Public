import express from 'express'
import axios from 'axios'
import { createClient } from '@supabase/supabase-js'
import auth from '../middleware/auth.js'

const router = express.Router()
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

// Initialize Paystack payment
router.post('/initialize', auth, async (req, res) => {
  try {
    const { bookingId, email } = req.body
    
    // Get booking from Supabase
    const { data: booking, error } = await supabase
      .from('bookings')
      .select('*, rooms(*)')
      .eq('id', bookingId)
      .single()
    
    if (error || !booking) return res.status(404).json({ error: 'Booking not found' })

    const response = await axios.post('https://api.paystack.co/transaction/initialize', {
      email,
      amount: booking.total_price * 100, // Paystack uses kobo
      reference: `booking_${booking.id}`,
      callback_url: `${process.env.FRONTEND_URL}/payment-callback`
    }, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    })

    // Update booking with payment reference
    const { error: updateError } = await supabase
      .from('bookings')
      .update({ payment_reference: response.data.data.reference })
      .eq('id', booking.id)

    if (updateError) throw updateError

    res.json(response.data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Verify payment
router.get('/verify/:reference', auth, async (req, res) => {
  try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${req.params.reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      }
    })

    if (response.data.data.status === 'success') {
      // Update booking payment status in Supabase
      const { error } = await supabase
        .from('bookings')
        .update({ payment_status: 'paid' })
        .eq('payment_reference', req.params.reference)

      if (error) throw error

      res.json({ success: true })
    } else {
      res.json({ success: false })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
