const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { validate } = require('../helperfunctions/validate')

const secret = 'yyyjydfghgtrey'
const expiry = 3600

// @desc        SignUp user.
// @route       POST /api/v1/users/register
// @access      Public

const register = (req, res) => {
  const { firstname, lastname, email, password } = req.body

  if (validate({ firstname, lastname, email, password, res })) {
    return
  }

  User.findOne({ email }, (error, userExists) => {
    if (error) {
      return res.status(500).json({
        status: 'fail',
        detail: {
          error
        }
      })
    }
    if (userExists) {
      return res.status(400).json({
        status: 'fail',
        detail: {
          error: 'email taken'
        }
      })
    }
    User.create({ firstname, lastname, email }, (error, newUser) => {
      if (error) {
        console.log('eorrr', error)

        return res.status(500).json({
          status: 'fail',
          detail: {
            error
          }
        })
      }

      bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
          newUser.password = hashedPassword
          newUser.save((error, savedUser) => {
            if (error) return res.status(500).json({ error })
            jwt.sign(
              {
                id: savedUser._id,
                email: savedUser.email,
                firstname: savedUser.firstname,
                lastname: savedUser.lastname
              },
              secret,
              { expiresIn: expiry },
              (error, token) => {
                if (error) {
                  return res.status(500).json({
                    status: 'fail',
                    error
                  })
                } else {
                  return res.status(201).json({
                    status: 'success',
                    token
                  })
                }
              }
            )
          })
        })
        .catch((error) => {
          return res.status(500).json({
            status: 'fail',
            detail: {
              error
            }
          })
        })
    })
  })
}

// @desc        Login user.
// @route       POST /api/v1/users/login
// @access      Public

const login = (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      detail: {
        message: 'Please enter both email and password'
      }
    })
  }

  User.findOne({ email }, (error, foundUser) => {
    if (error) {
      return res.status(500).json({
        status: 'fail',
        detail: {
          error
        }
      })
    }
    if (!foundUser) {
      return res.status(401).json({
        status: 'fail',
        detail: {
          message: 'Incorrect email or password'
        }
      })
    }
    const isPasswordMatch = bcrypt.compareSync(password, foundUser.password)
    if (!isPasswordMatch) {
      return res.status(401).json({
        status: 'fail',
        detail: {
          message: 'Incorrect email or password'
        }
      })
    }
    const user = {
      id: foundUser._id,
      email: foundUser.email,
      firstname: foundUser.firstname,
      lastname: foundUser.lastname
    }
    const token = jwt.sign(user, secret, {
      expiresIn: expiry
    })
    res.status(200).json({
      status: 'success',
      token,
      user
    })
  })
}
module.exports = {
  register,
  login
}
