module.exports = baseResponse => res => {
  const idToken = res.AuthenticationResult.IdToken
  const accessToken = res.AuthenticationResult.AccessToken
  return {
    ...baseResponse,
    body: JSON.stringify({ idToken, accessToken })
  }
}
