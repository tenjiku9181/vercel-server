require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const projectRoutes = require('./routes/projectApi')

const app = express()
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
  next()
})
app.use('/api/projects', projectRoutes)
let isConnected = false
async function connectDB() {
  if (isConnected) return
  await mongoose.connect(process.env.MONGO_URI)
  isConnected = true
}

// ---- Middleware Hook ----
app.use(async (req, res, next) => {
  try {
    await connectDB()
    next()
  } catch (err) {
    console.error('DB connection failed:', err)
    res.status(500).json({ error: 'Database unavailable' })
  }
})

module.exports = app
