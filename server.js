require('dotenv').config()
 
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const projectRoutes = require('./routes/projectApi')
 
// express app
const app = express()
 
// middleware
app.use(express.json())
app.use(cors())

app.use('/api/projects', projectRoutes)

// connect once
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('connected to database'))
  .catch(err => console.log('🦺🦺', err))

// 🔑 EXPORT — do not listen
module.exports = app
