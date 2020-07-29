const processRes = require('./process-response.js')
const processErr = require('./process-error.js')

module.exports = (AWS, { Username, Password }, baseResponse) => {
  const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' })
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    AuthParameters: {
      USERNAME: Username,
      PASSWORD: Password
    },
    ClientId: process.env.COGNITO_CLIENT_ID
  }
  return cognitoIdentityServiceProvider.initiateAuth(params).promise()
    .then(processRes(baseResponse))
    .catch(processErr(baseResponse))
}
