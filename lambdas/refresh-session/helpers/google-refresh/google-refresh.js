module.exports = (AWS, data, baseResponse) => {
  return {
    ...baseResponse,
    statusCode: 501,
    body: JSON.stringify({ message: 'Refreshing session via Google is currently not supported.' })
  }
}
