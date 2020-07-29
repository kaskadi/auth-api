const AWS = require('aws-sdk')
const cognitoAuth = require('./helpers/cognito-auth/cognito-auth.js')
const googleAuth = require('./helpers/google-auth/google-auth.js')

module.exports.handler = async (event) => {
  const data = JSON.parse(event.body)
  var response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  switch (data.method) {
    case 'Cognito':
      return await cognitoAuth(AWS, data, response)
    case 'Google':
      return await googleAuth(AWS, data, response)
    default:
      return await cognitoAuth(AWS, data, response)
  }
}
