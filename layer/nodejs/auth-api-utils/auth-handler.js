module.exports = (AWS, event, cognitoHandler, googlehandler) => {
  const data = JSON.parse(event.body)
  const baseResponse = require('./get-base-response.js')()
  if (data.method === 'Google') {
    return googlehandler(AWS, data, baseResponse)
  }
  return cognitoHandler(AWS, data, baseResponse)
}
