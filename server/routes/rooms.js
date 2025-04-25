import express from 'express'
import { getRooms, getRoomById, createRoom } from '../models/Room.js'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'

const router = express.Router()

// Get all rooms
router.get('/', async (req, res) => {
  try {
    const { data: rooms, error } = await getRooms()
    if (error) throw error
    res.json(rooms)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Create room (admin only)
router.post('/', auth, admin, async (req, res) => {
  try {
    const { data: room, error } = await createRoom(req.body)
    if (error) throw error
    res.status(201).json(room)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
