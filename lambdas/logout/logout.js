const AWS = require('aws-sdk')
const cognitoLogout = require('./helpers/cognito-logout/cognito-logout.js')

module.exports.handler = async (event) => {
  const data = JSON.parse(event.body)
  const baseResponse = require('auth-api-utils').getBaseResponse()
  if (data.method === 'Google') {
    return {
      ...baseResponse,
      statusCode: 501,
      body: JSON.stringify({ message: 'Logout via Google is currently not supported.' })
    }
  }
  return await cognitoLogout(AWS, data, baseResponse)
}
