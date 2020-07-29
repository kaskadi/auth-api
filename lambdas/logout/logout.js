const AWS = require('aws-sdk')
const cognitoLogout = require('./helpers/cognito-logout/cognito-logout.js')
const googleLogout = require('./helpers/google-logout/google-logout.js')
const { authHandler } = require('auth-api-utils')

module.exports.handler = async (event) => {
  return await authHandler(AWS, event, cognitoLogout, googleLogout)
}
