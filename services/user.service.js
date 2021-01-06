import { handleError, handleResponse } from '../helpers/response.helper'
import User from '../models/user.model'

const getAllUsersService = async () => {
    try {
        const users = await User.find()
        return handleResponse('Get users successfully', users)
    } catch (error) {
        console.log(error)
    }
}

const createUserService = async data => {
    try {
        const userExist = await User.findOne({email: data.email})

        if (userExist) return handleError('User already exist', 400)

        const user = new User(data)
        const saveUser = await user.save()
        return handleResponse('Create user successfully', saveUser)
    } catch (error) {
        console.log(error)
    }
}

export { getAllUsersService, createUserService }