import { handleError } from '../helpers/response.helper'
import { getAllUsersService, createUserService } from '../services/user.service'

const getAllUsers = async (req, res) => {
  try {
    const data = await getAllUsersService()
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError('Internal Server Error', 500))
  }
}

const createUser = async (req, res) => {
  try {
    const data = await createUserService(req.body)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError('Internal Server Error', 500))
  }
}

export { getAllUsers, createUser }
