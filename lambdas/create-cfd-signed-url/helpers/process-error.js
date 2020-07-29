module.exports = baseResponse => err => {
  console.log(JSON.stringify(err, null, 2))
  return {
    ...baseResponse,
    statusCode: 502,
    body: JSON.stringify({ message: 'An error occured...' })
  }
}
