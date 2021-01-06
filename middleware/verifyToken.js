import { jwtDecode, jwtVerify } from '../helpers/token.helper'
import { handleError } from '../helpers/response.helper'

const verifyAccessToken = async (req, res, next) => {
    try {
        
        const { authorization } = req.headers

        if (!authorization) return res.status(401).json(handleError('Access Denied', 401))

        const [authType, token] = authorization.trim().split(' ')

        if (authType !== 'Bearer') return res.status(401).json(handleError('Expected a Bearer token', 401))

        const user = jwtVerify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
        req.userId = user._id
        return next()
    } catch (error) {
        if (error.name) return res.status(401).json(handleError(error.message, 401))
    }
}

const verifyRefreshToken = async (req, res, next) => {
    try {
        const { accessToken, refreshToken } = req.body

        if (!accessToken || !refreshToken) return res.status(401).json(handleError('Access Denied', 401))

        const accessPayload = jwtDecode(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY)
        const refreshPayload = jwtVerify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY)

        if (accessPayload.exp * 1000 > Date.now()) return res.status(401).json(handleError('Access Token still alive', 401))

        if (accessPayload._id !== refreshPayload._id) return res.status(401).json(handleError('Access Denied', 401))
        req.userId = accessPayload._id
        return next()
    } catch (error) {
        console.log(error)
        if (error.name) return res.status(401).json(handleError(error.message, 401))
    }
}

export { verifyAccessToken, verifyRefreshToken }