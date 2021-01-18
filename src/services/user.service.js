import logger from '../helpers/logger.helper'
import { handleError, handleResponse } from '../helpers/response.helper'
import User from '../models/user.model'

const getAllUsersService = async (filter = {}) => {
  try {
    const users = await User.find(filter)
    return handleResponse('Get users successfully', users)
  } catch (error) {
    logger.error(new Error(error.message))

  }
}

const createUserService = async (data) => {
  try {
    const userExist = await User.findOne({ email: data.email })

    if (userExist) return handleError('User already exist', 400)

    const user = new User(data)
    const saveUser = await user.save()
    return handleResponse('Create user successfully', saveUser)
  } catch (error) {
    logger.error(new Error(error.message))

  }
}

export { getAllUsersService, createUserService }
