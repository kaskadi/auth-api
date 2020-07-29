module.exports = baseResponse => res => {
  return {
    ...baseResponse,
    body: JSON.stringify({ idToken: res.sessionToken })
  }
}
