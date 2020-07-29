const AWS = require('aws-sdk')
const cognitoAuth = require('./helpers/cognito-auth/cognito-auth.js')
const googleAuth = require('./helpers/google-auth/google-auth.js')
const { authHandler } = require('auth-api-utils')

module.exports.handler = async (event) => {
  return await authHandler(AWS, event, cognitoAuth, googleAuth)
}
