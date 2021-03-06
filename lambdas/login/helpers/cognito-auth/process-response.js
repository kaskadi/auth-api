const crypto = require('crypto')

module.exports = baseResponse => res => {
  const accessToken = res.AuthenticationResult.AccessToken
  const idToken = res.AuthenticationResult.IdToken
  const refreshToken = res.AuthenticationResult.RefreshToken
  const email = JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString()).email
  const emailHash = crypto.createHash('md5').update(email).digest('hex')
  return {
    ...baseResponse,
    body: JSON.stringify({ accessToken, idToken, refreshToken, email, emailHash })
  }
}
