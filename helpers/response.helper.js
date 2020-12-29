const genMessageCode = message => message.split(' ').map(val => val.toUpperCase()).join('_')

const handleResponse = (message, data = null, status = 200) => ({ status, message, messageCode: genMessageCode(message), data })

const handleError = (message, status) => ({ status, message, messageCode: genMessageCode(message)})

export { handleResponse, handleError } 

