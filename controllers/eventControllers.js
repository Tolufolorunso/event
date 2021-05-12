const { findById } = require('../models/eventModel')
const Event = require('../models/eventModel')

const createEvent = async (req, res) => {
  try {
    const { title, category, cost } = req.body

    const event = await Event.create({
      title,
      category,
      cost: parseFloat(cost),
    })

    res.status(201).json({
      status: 'success',
      data: {
        event,
      },
    })
  } catch (error) {
    // console.log(error)
    // console.log(error.message)
    if (error.errors.category.properties.type === 'enum') {
      return res.status(400).json({
        status: 'fail',
        data: {
          errorMessage: error.message,
        },
      })
    }
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'fail',
        data: {
          errorMessage: 'Event already exists',
        },
      })
    }
    return res.status(500).json({
      status: 'fail',
      data: {
        errorMessage: 'Server Error, try again',
      },
    })
  }
}

const getAllEvents = async (req, res, next) => {
  try {
    let query = {}
    if (req.query.category) {
      query.category = req.query.category
    }
    const events = await Event.find(query)
    res.status(200).json({
      status: 'success',
      result: events.length,
      data: {
        events,
      },
    })
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      errormessage: 'Error occurred',
    })
  }
}

const getEvent = async (req, res, next) => {
  try {
    const ID = req.params.eventID
    const event = await Event.findById(ID)
    if (!event) {
      return res.status(404).json({
        status: 'fail',
        errormessage: 'Event not found',
      })
    }
    res.status(200).json({
      status: 'success',
      data: event,
    })
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      errormessage: 'Error occurred',
      data: error,
    })
  }
}

const updateEvent = async (req, res, next) => {
  try {
    const ID = req.params.eventID
    const event = await Event.findByIdAndUpdate(ID)
    if (!event) {
      return res.status(404).json({
        status: 'fail',
        errormessage: 'Event not found',
      })
    }
    res.status(200).json({
      status: 'success',
      message: 'Event Updated successfully',
      data: null,
    })
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      errormessage: 'Error occurred',
      data: error,
    })
  }
}

const deleteEvent = async (req, res, next) => {
  console.log('update event')
}

module.exports = {
  createEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent,
}
