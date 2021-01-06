import logger from './logger.helper'

const genMessageCode = message => message.split(' ').map(val => val.toUpperCase()).join('_')

const handleResponse = (message, data = null, status = 200) => ({ status, message, messageCode: genMessageCode(message), data })

const handleError = (message, status) => {
    logger.error(message)
    return { status, message, messageCode: genMessageCode(message)}
}

export { handleResponse, handleError } 

