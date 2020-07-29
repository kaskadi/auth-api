const AWS = require('aws-sdk')
const cognitoAuth = require('./helpers/cognito-auth/cognito-auth.js')
const googleAuth = require('./helpers/google-auth/google-auth.js')

module.exports.handler = async (event) => {
  const data = JSON.parse(event.body)
  const baseResponse = require('auth-api-utils').getBaseResponse()
  if (data.method === 'Google') {
    return await googleAuth(AWS, data, baseResponse)
  }
  return await cognitoAuth(AWS, data, baseResponse)
}
