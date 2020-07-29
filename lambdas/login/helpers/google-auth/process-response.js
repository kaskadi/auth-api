module.exports = response => res => {
  response.body = JSON.stringify({ idToken: res.sessionToken })
  return response
}
