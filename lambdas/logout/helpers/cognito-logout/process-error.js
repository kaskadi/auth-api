module.exports = baseResponse => err => {
  console.log(JSON.stringify(err, null, 2))
  return {
    ...baseResponse,
    statusCode: err.code === 'NotAuthorizedException' ? 401 : 502,
    body: JSON.stringify({
      message: err.code === 'NotAuthorizedException' ? 'Provided access token is incorrect.' : 'An error occured...'
    })
  }
}
