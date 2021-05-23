const axios = require('axios')
const https = require('https')

module.exports.api = async (url) => {
  let getImage
  try {
    getImage = await axios.get(url)
    return getImage.data
  } catch (error) {
    throw error
  }
}
