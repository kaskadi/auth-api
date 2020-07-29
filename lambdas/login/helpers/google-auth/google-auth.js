const processRes = require('./process-response.js')
const processErr = require('./process-error.js')

module.exports = (AWS, { token }, response) => {
  AWS.config.region = 'eu-central-1'
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.COGNITO_IDENTITY_POOL_ID,
    Logins: {
      'accounts.google.com': token
    }
  })
  return AWS.config.credentials.get().promise()
    .then(processRes(response))
    .catch(processErr(response))
}
