import logger from '../helpers/logger.helper'
import { handleError, handleResponse } from '../helpers/response.helper'
import { jwtSign } from '../helpers/token.helper'
import User from '../models/user.model'

const loginService = async data => {
    try {
        const { email, password } = data
        const user = await User.findOne({ email })

        if (!user) return handleError('Email does not exist', 404)

        const isMatched = await user.verifyPassword(password)

        if (!isMatched) return handleError('Password is incorrect', 400)
        
        const payload = { _id: user._id }
        const accessToken = jwtSign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, process.env.ACCESS_TOKEN_LIFE)
        const refreshToken = jwtSign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, process.env.REFRESH_TOKEN_LIFE)

        logger.info(`User [${user._id}] logged in to system`)
        return handleResponse('Login successfully', { accessToken, refreshToken })
    } catch (error) {
        console.log(error)
    }
}

const refreshAccessTokenService = async (payload, refreshToken) => {
    try {
        const accessToken = jwtSign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, process.env.ACCESS_TOKEN_LIFE)

        logger.info(`User [${payload._id}] logged in to system`)
        return handleResponse('Login successfully', { accessToken, refreshToken })
    } catch (error) {
        console.log(error)
    }
}

export { loginService, refreshAccessTokenService }