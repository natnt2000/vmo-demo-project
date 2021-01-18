import { handleError } from '../helpers/response.helper'
import {
  loginService,
  refreshAccessTokenService,
} from '../services/auth.service'

const login = async (req, res) => {
  try {
    const data = await loginService(req.body)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const refreshAccessToken = async (req, res) => {
  try {
    const data = await refreshAccessTokenService(
      { _id: req.userId },
      req.body.refreshToken
    )
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

export { login, refreshAccessToken }
