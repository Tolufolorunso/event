const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../models/userModel')

let adminPassword = 'thankyouseyiogunjuyigbe'

exports.createAdmin = (req, res) => {
  User.findOne({ role: 'admin' }, (error, admin) => {
    if (error) throw error
    if (admin) {
      return 'admin account already exists'
    }
    User.create(
      {
        firstname: 'Seyi',
        lastname: 'Ogunjuyigbe',
        email: 'admin@reskillamericans.org',
        role: 'admin'
      },
      (error, createdAdmin) => {
        if (error) throw error

        bcrypt
          .hash(adminPassword, 10)
          .then((hashedPassword) => {
            createdAdmin.password = hashedPassword
            createdAdmin.save((error, savedAdmin) => {
              if (error) throw error
              return 'admin created'
            })
          })
          .catch((error) => {
            throw error
          })
      }
    )
  })
}
