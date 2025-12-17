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
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log("🦺🦺", err)
  })