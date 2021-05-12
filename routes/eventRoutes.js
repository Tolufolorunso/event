const express = require('express')
const router = express.Router()

const {
  createEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventControllers')

router.route('/').post(createEvent).get(getAllEvents)
router.route('/:eventID').get(getEvent).put(updateEvent).delete(deleteEvent)

module.exports = router
