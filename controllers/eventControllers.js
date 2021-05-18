const Event = require('../models/eventModel')

// @desc        Create new event.
// @route       POST /events
// @access      Public
const createEvent = async (req, res) => {
  try {
    const { title, category, cost, publisher } = req.body
    const event = await Event.create({
      title,
      category,
      publisher: `${req.user.firstname} ${req.user.lastname}`,
      publisherID: req.user._id,
      cost: parseFloat(cost)
    })

    res.status(201).json({
      status: 'success',
      data: {
        event
      }
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'fail',
        data: {
          errorMessage: 'Event already exists'
        }
      })
    }
    return res.status(500).json({
      status: 'fail',
      data: {
        errorMessage: error.message
      }
    })
  }
}

// @desc        Fetch all events.
// @route       GET /events || /events?category=social
// @access      Public
const getAllEvents = async (req, res, next) => {
  try {
    let query = {}
    if (req.query.category) {
      query.category = req.query.category
    }
    const events = await Event.find(query)
    return res.status(200).json({
      status: 'success',
      result: events.length,
      data: {
        events
      }
    })
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      errormessage: 'Error occurred'
    })
  }
}

// @desc        Fetch single event.
// @route       GET /events/:eventID
// @access      Public
const getEvent = async (req, res, next) => {
  try {
    const ID = req.params.eventID
    const event = await Event.findById(ID)
    if (!event) {
      return res.status(404).json({
        status: 'fail',
        errormessage: 'Event not found'
      })
    }
    res.status(200).json({
      status: 'success',
      data: event
    })
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      errormessage: 'Error occurred',
      data: error
    })
  }
}

// @desc        Update event.
// @route       PUT /events/:eventID
// @access      Public
const updateEvent = async (req, res, next) => {
  try {
    const ID = req.params.eventID
    const event = await Event.findByIdAndUpdate(ID, { ...req.body })
    if (!event) {
      return res.status(404).json({
        status: 'fail',
        errormessage: 'Event not found'
      })
    }
    res.status(200).json({
      status: 'success',
      message: 'Event Updated successfully'
    })
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      errormessage: 'Error occurred',
      data: error
    })
  }
}

// @desc        Delete event.
// @route       DELETE /events/:eventID
// @access      Public
const deleteEvent = async (req, res, next) => {
  try {
    const ID = req.params.eventID
    const event = await Event.findByIdAndDelete(ID)
    if (!event) {
      return res.status(404).json({
        status: 'fail',
        errormessage: 'Event not found'
      })
    }
    res.status(200).json({
      status: 'success',
      message: 'Event deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      errormessage: 'Error occurred',
      data: error.message
    })
  }
}

module.exports = {
  createEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent
}
