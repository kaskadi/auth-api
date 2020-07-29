module.exports = baseResponse => err => {
  console.log(JSON.stringify(err, null, 2))
  return {
    ...baseResponse,
    statusCode: 401,
    body: JSON.stringify({ message: 'Provided credentials are incorrect.' })
  }
}
