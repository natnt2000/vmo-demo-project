const genMessageCode = (message) =>
  message
    .split(' ')
    .map((val) => val.toUpperCase())
    .join('_')

const handleResponse = (message, data = null, status = 200, messageCode = null) => ({
  status,
  message,
  messageCode: messageCode ?? genMessageCode(message),
  data,
})

const handleError = (message, status, messageCode = null) => ({
  status,
  message,
  messageCode: messageCode ?? genMessageCode(message),
})

export { handleResponse, handleError }
