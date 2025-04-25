import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Configure __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables FIRST with explicit path
dotenv.config({ path: path.join(__dirname, '.env') })

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Import routes AFTER env is loaded
import authRoutes from './routes/auth.js'
import roomRoutes from './routes/rooms.js'
import bookingRoutes from './routes/bookings.js'
import paymentRoutes from './routes/payments.js'

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/rooms', roomRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/payments', paymentRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
