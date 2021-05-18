const validate = ({ firstname, lastname, email, password, res }) => {
  if (!password) {
    res.status(400).json({
      message: 'fail',
      data: {
        message: 'Password field required'
      }
    })
    return true
  }

  if (!email) {
    res.status(400).json({
      message: 'fail',
      data: {
        message: 'Email field required'
      }
    })
    return true
  }

  if (!firstname) {
    res.status(400).json({
      message: 'fail',
      data: {
        message: 'Firstname field required'
      }
    })
    return true
  }

  if (!lastname) {
    res.status(400).json({
      message: 'fail',
      data: {
        message: 'Lastname field required'
      }
    })
    return true
  }

  const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  const letters = /^[A-Za-z]+$/

  if (!email.match(emailFormat)) {
    res.status(400).json({
      message: 'fail',
      data: {
        message: 'Invalid email'
      }
    })
    return true
  }

  if (!firstname.match(letters)) {
    res.status(400).json({
      message: 'fail',
      data: {
        message: 'Invalid firstname'
      }
    })
    return true
  }

  if (!lastname.match(letters)) {
    res.status(400).json({
      message: 'fail',
      data: {
        message: 'Invalid lastname'
      }
    })
    return true
  }

  return false
}

module.exports = { validate }
