const genMessageCode = message => message.split(' ').map(val => val.toUpperCase()).join('_')

const handleResponse = (message, data = null, status = 200) => ({ status, message, messageCode: genMessageCode(message), data })

export default handleResponse
