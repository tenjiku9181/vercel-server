// require('dotenv').config()

// const express = require('express')
// const mongoose = require('mongoose')
// const cors = require('cors')
// const projectRoutes = require('./routes/projectApi')
// const app = express()
// app.use(express.json())
// app.use(cors())
// app.use((req, res, next) => {
//   console.log(req.path, req.method)
//   next()
// })
// app.use('/api/projects', projectRoutes)
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('connected to database')
//     app.listen(process.env.PORT, () => {
//       console.log('listening for requests on port', process.env.PORT)
//     })
//   })
//   .catch((err) => {
//     console.log("🦺🦺", err)
//   })
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const projectRoutes = require('./routes/projectApi')

const app = express()

app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('/api/projects', projectRoutes)

// ---- Database Connection (Singleton Pattern) ----
let isConnected = false

async function connectDB() {
  if (isConnected) return
  await mongoose.connect(process.env.MONGO_URI)
  isConnected = true
  console.log('connected to database')
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

// ---- Export, Do NOT Listen ----
module.exports = app
