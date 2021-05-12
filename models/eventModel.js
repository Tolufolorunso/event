const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    unique: true,
    trim: true,
    min: [4, 'Name is too short!'],
    max: 40,
  },
  cost: {
    type: Number,
    required: [true, 'Cost is required'],
    trim: true,
  },
  category: {
    type: String,
    uppercase: false,
    trim: true,
    min: [2, 'Name is too short!'],
    max: 40,
    enum: [
      'corporate',
      'social',
      'virtual',
      'fundraising',
      'festival',
      'community',
    ],
    default: 'social',
  },
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event
