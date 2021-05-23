const Event = require('../models/eventModel')
const { api: splashAPI } = require('../helperfunctions/api')
const { sendRes } = require('../helperfunctions/sendRes')

// @desc        Create new event.
// @route       POST /events
// @access      Public
const createEvent = async (req, res) => {
  try {
    const { title, category, cost } = req.body
    const fetchedImageUrl = await splashAPI(
      `https://imagegen.herokuapp.com/?category${category}`
    )

    if (!fetchedImageUrl.status) {
      return sendRes('error', 'Fail to fetch image', res, 400)
    }
    const event = await Event.create({
      title,
      category,
      photoURI: fetchedImageUrl.image,
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
    sendRes('error', error, res, 500)
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
    sendRes('error', error.message, res, 500)
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
    sendRes('error', error.message, res, 500)
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
    sendRes('error', error.message, res, 500)
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
    sendRes('error', error.message, res, 500)
  }
}

module.exports = {
  createEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent
}
