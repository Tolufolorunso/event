const express = require('express')
const router = express.Router()

const {
  createEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventControllers')
const { authenticateUser, isAdmin } = require('../middlewares/authenticate')

router
  .route('/')
  .post(authenticateUser, createEvent)
  .get(authenticateUser, getAllEvents)
router
  .route('/:eventID')
  .get(authenticateUser, getEvent)
  .put(authenticateUser, isAdmin, updateEvent)
  .delete(authenticateUser, isAdmin, deleteEvent)

module.exports = router
