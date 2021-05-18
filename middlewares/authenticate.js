const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const secret = 'yyyjydfghgtrey'

const authenticateUser = (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }
  if (!token) {
    return res.status(401).json({
      status: 'fail',
      detail: {
        message: 'You are not login, please log in'
      }
    })
  }

  jwt.verify(token, secret, (error, decodedToken) => {
    if (error) {
      return res.status(500).json({
        error
      })
    }
    // if (!decodedToken) {
    //   return res.status(401).json({
    //     status: 'fail',
    //     detail: {
    //       message: 'The user doesnt exists'
    //     }
    //   })
    // }
    User.findById(decodedToken.id, (error, foundUser) => {
      if (error) {
        return res.status(500).json({
          error
        })
      }
      if (!foundUser) {
        return res.status(401).json({
          status: 'fail',
          detail: {
            message: 'The user doesnt exists'
          }
        })
      }
      req.user = foundUser
      next()
    })
  })
}

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({
      status: 'fail',
      detail: {
        message: 'You do not have access to perform the operation!'
      }
    })
  }
  next()
}

module.exports = {
  authenticateUser,
  isAdmin
}
