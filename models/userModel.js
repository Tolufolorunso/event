const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Firstname field is required'],
      trim: true
    },
    lastname: {
      type: String,
      required: [true, 'Lastname field is required'],
      trim: true
    },
    username: {
      type: String,
      required: [true, 'Username field is required'],
      unique: true,
      lowercase: true,
      trim: true,
      min: [2, 'username charaters is too short!'],
      max: 20
    },
    password: {
      type: String,
      trim: true,
      min: [2, 'Charaters is too short!'],
      max: 20
    }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = User
