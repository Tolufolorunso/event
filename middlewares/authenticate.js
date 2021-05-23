const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const User = require('../models/userModel')

// const authenticateUser = (req, res, next) => {
//   let token
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     token = req.headers.authorization.split(' ')[1]
//   }
//   if (!token) {
//     return res.status(401).json({
//       status: 'fail',
//       detail: {
//         message: 'You are not login, please log in'
//       }
//     })
//   }
//   console.log(token)
//   jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
//     console.log(decodedToken)
//     console.log(error)
//     if (error) {
//       return res.status(500).json({
//         status: 'fail',
//         detail: {
//           message: 'You are not login, please log in'
//         }
//       })
//     }
//     // if (!decodedToken) {
//     //   return res.status(401).json({
//     //     status: 'fail',
//     //     detail: {
//     //       message: 'The user doesnt exists'
//     //     }
//     //   })
//     // }
//     User.findById(decodedToken.id, (error, foundUser) => {
//       if (error) {
//         return res.status(500).json({
//           error
//         })
//       }
//       if (!foundUser) {
//         return res.status(401).json({
//           status: 'fail',
//           detail: {
//             message: 'The user doesnt exists'
//           }
//         })
//       }
//       req.user = foundUser
//       next()
//     })
//   })
// }

const authenticateUser = async (req, res, next) => {
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
        errorMessage: 'You are not login, please log in'
      }
    })
  }

  try {
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    )

    const currentUser = await User.findById(decodedToken.id)
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        detail: {
          errorMessage: 'The user doesnt exists'
        }
      })
    }
    req.user = currentUser
    next()
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      detail: {
        errorMessage: error
      }
    })
  }
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
