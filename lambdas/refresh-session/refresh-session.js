const AWS = require('aws-sdk')
const cognitoRefresh = require('./helpers/cognito-refresh/cognito-refresh.js')

module.exports.handler = async (event) => {
  const data = JSON.parse(event.body)
  const baseResponse = require('auth-api-utils').getBaseResponse()
  if (data.method === 'Google') {
    return {
      ...baseResponse,
      statusCode: 501,
      body: JSON.stringify({ message: 'Refreshing session via Google is currently not supported.' })
    }
  }
  return await cognitoRefresh(AWS, data, baseResponse)
}
