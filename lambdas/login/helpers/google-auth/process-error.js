module.exports = response => err => {
  console.log(JSON.stringify(err, null, 2))
  response.statusCode = 401
  response.body = JSON.stringify({ message: 'Provided credentials are incorrect.' })
  return response
}
