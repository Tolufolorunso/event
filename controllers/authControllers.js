const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { validate } = require('../helperfunctions/validate')

const sendRes = (isSuccess, data, res, statusCode) => {
  if (isSuccess === 'error') {
    res.status(statusCode).json({
      status: 'fail',
      detail: {
        errorMessage: data
      }
    })
  } else {
    res.status(statusCode).json({
      status: 'success',
      token: data.token,
      data: {
        user: data.user
      }
    })
  }
}

// @desc        SignUp user.
// @route       POST /api/v1/users/register
// @access      Public

const register = async (req, res) => {
  let { firstname, lastname, email, password } = req.body

  if (validate({ firstname, lastname, email, password, res })) {
    return
  }
  password = password.toLowerCase()

  try {
    const user = await User.findOne({ email })
    if (user) {
      return sendRes('error', 'email taken', res, 400)
    }

    password = await bcrypt.hash(password, 10)

    const newUser = await User.create({ firstname, lastname, email, password })
    const token = jwt.sign(
      {
        id: newUser._id,
        fullname: `${newUser.firstname} ${newUser.lastname}`
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    )
    return res.status(201).json({
      status: 'success',
      token
    })
  } catch (error) {
    return sendRes('error', error.message, res, 500)
  }
}

// @desc        Login user.
// @route       POST /api/v1/users/login
// @access      Public

const login = async (req, res) => {
  let { email, password } = req.body
  if (!email || !password) {
    return sendRes('error', 'Please enter both email and password', res, 401)
  }

  password = password.toLowerCase()

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return sendRes('error', 'Incorrect email or password', res, 400)
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return sendRes('error', 'Incorrect email or password', res, 400)
    }

    const userPayload = {
      id: user._id,
      fullname: `${user.firstname} ${user.lastname}`
    }

    const token = jwt.sign(userPayload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    })
    sendRes('success', { token, user }, res, 200)
  } catch (error) {
    sendRes('error', error.message, res, 500)
  }
}

module.exports = {
  register,
  login
}
