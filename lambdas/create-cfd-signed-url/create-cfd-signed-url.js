const AWS = require('aws-sdk')
const getSignedUrl = require('./helpers/get-signed-url.js')

module.exports.handler = async (event) => {
  const baseResponse = require('auth-api-utils').getBaseResponse()
  return getSignedUrl(AWS, baseResponse)
}
