module.exports = response => err => {
  console.log(JSON.stringify(err, null, 2))
  response.statusCode = err.code === 'NotAuthorizedException' ? 401 : 502
  const message = err.code === 'NotAuthorizedException' ? 'Provided credentials are incorrect.' : 'An error occured...'
  response.body = JSON.stringify({ message })
  return response
}
