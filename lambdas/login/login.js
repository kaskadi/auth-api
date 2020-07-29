const crypto = require('crypto')
const AWS = require('aws-sdk')

module.exports.handler = async (event) => {
  const data = JSON.parse(event.body)
  var response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  // depending on the login method used, we will process differently
  switch (data.method) {
    case 'Cognito': {
      const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' })
      const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        AuthParameters: {
          USERNAME: data.Username,
          PASSWORD: data.Password
        },
        ClientId: process.env.COGNITO_CLIENT_ID
      }
      await cognitoIdentityServiceProvider.initiateAuth(params).promise().then(res => {
        const accessToken = res.AuthenticationResult.AccessToken
        const idToken = res.AuthenticationResult.IdToken
        const refreshToken = res.AuthenticationResult.RefreshToken
        const email = JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString()).email
        const emailHash = crypto.createHash('md5').update(email).digest('hex')
        response.body = JSON.stringify({ accessToken, idToken, refreshToken, email, emailHash })
      }).catch(err => {
        console.log(JSON.stringify(err, null, 2))
        response.statusCode = err.code === 'NotAuthorizedException' ? 401 : 502
        const message = err.code === 'NotAuthorizedException' ? 'Provided credentials are incorrect.' : 'An error occured...'
        response.body = JSON.stringify({ message })
      })
      break
    }
    case 'Google':
      AWS.config.region = 'eu-central-1'
      // configure credentials provided by Google
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: process.env.COGNITO_IDENTITY_POOL_ID,
        Logins: {
          'accounts.google.com': data.token
        }
      })
      // load credentials
      await AWS.config.credentials.get().promise().then(res => {
        response.body = JSON.stringify({ idToken: res.sessionToken })
      }).catch(err => {
        console.log(JSON.stringify(err, null, 2))
        response.statusCode = 401
        response.body = JSON.stringify({ message: 'Provided credentials are incorrect.' })
      })
      break
    default:
      break
  }
  return response
}
