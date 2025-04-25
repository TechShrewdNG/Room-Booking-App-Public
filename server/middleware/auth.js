import jwt from 'jsonwebtoken'
import { getUserById } from '../models/User.js'

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { data: user, error } = await getUserById(decoded.id)

    if (error || !user) throw new Error()
    req.user = user
    next()
  } catch (err) {
    res.status(401).json({ error: 'Please authenticate' })
  }
}

export default auth
