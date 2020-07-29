const processRes = require('./process-response.js')
const processErr = require('./process-error.js')

module.exports = (AWS, { accessToken }, baseResponse) => {
  const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' })
  const params = {
    AccessToken: accessToken
  }
  return cognitoIdentityServiceProvider.globalSignOut(params).promise()
    .then(processRes(baseResponse))
    .catch(processErr(baseResponse))
}
