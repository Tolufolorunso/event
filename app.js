const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config({
  path: './config.env'
})

const app = express()

app.use(express.json())

app.use(cors())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/v1/events', require('./routes/eventRoutes'))
app.use('/api/v1/users', require('./routes/authRoutes'))

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'success',
    data: {
      name: 'Folorunso Tolulope',
      message: 'Welcome Home, Reskillamerica'
    }
  })
})

// Connect DB
require('./database/setup')()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
