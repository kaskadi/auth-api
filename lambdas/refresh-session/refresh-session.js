const AWS = require('aws-sdk')
const cognitoRefresh = require('./helpers/cognito-refresh/cognito-refresh.js')
const googleRefresh = require('./helpers/google-refresh/google-refresh.js')
const { authHandler } = require('auth-api-utils')

module.exports.handler = async (event) => {
  return await authHandler(AWS, event, cognitoRefresh, googleRefresh)
}
