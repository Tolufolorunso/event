const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      min: [4, 'Name is too short!'],
      max: 40
    },
    cost: {
      type: Number,
      required: [true, 'Cost is required'],
      trim: true,
      min: [1, 'Cost must be greater than zero']
    },
    category: {
      type: String,
      trim: true,
      min: [2, 'Name is too short!'],
      max: 40,
      enum: ['business', 'casual', 'party', 'general'],
      default: 'general'
    },
    photoURI: {
      type: String
    },
    publisherID: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    publisher: { type: String }
  },
  { timestamps: true }
)

const Event = mongoose.model('Event', eventSchema)

module.exports = Event
