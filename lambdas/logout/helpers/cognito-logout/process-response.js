module.exports = baseResponse => res => {
  return {
    ...baseResponse,
    body: JSON.stringify({ message: 'User successfully logged out!' })
  }
}
