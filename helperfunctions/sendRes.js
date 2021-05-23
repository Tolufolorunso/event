module.exports.sendRes = (isSuccess, data, res, statusCode) => {
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
      data
    })
  }
}
