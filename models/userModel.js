const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Please provide firstname'],
      trim: true
    },
    lastname: {
      type: String,
      required: [true, 'Please provide lastname'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide password'],
      unique: true,
      lowercase: true,
      trim: true,
      min: [2, 'email is too short!'],
      max: 20
    },
    password: {
      type: String,
      trim: true,
      min: [2, 'Charaters is too short!'],
      max: 20
    },
    role: {
      type: String,
      required: true,
      enum: ['regular', 'admin'],
      default: 'regular'
    }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = User
