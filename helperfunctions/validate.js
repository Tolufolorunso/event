const sendRes = (data, res) => {
  res.status(400).json({
    status: 'fail',
    detail: {
      errorMessage: data
    }
  })
}
const validate = ({ firstname, lastname, email, password, res }) => {
  if (!password) {
    sendRes('Password field required', res)
    return true
  }

  if (!email) {
    sendRes('Email field required', res)
    return true
  }

  if (!firstname) {
    sendRes('Firstname field required', res)
    return true
  }

  if (!lastname) {
    sendRes('Lastname field required', res)
    return true
  }

  const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  const letters = /^[A-Za-z]+$/

  if (!email.match(emailFormat)) {
    sendRes('Invalid email', res)
    return true
  }

  if (!firstname.match(letters)) {
    sendRes('Invalid firstname', res)
    return true
  }

  if (!lastname.match(letters)) {
    sendRes('Invalid lastname', res)
    return true
  }
  return false
}

module.exports = { validate }
