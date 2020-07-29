module.exports = (AWS, event, baseResponse) => {
  return {
    ...baseResponse,
    statusCode: 501,
    body: JSON.stringify({ message: 'Logout via Google is currently not supported.' })
  }
}
