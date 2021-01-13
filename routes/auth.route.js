import express from 'express'
import { login, refreshAccessToken } from '../controllers/auth.controller'
import verifyRequest from '../middleware/verifyRequest'
import { verifyRefreshToken } from '../middleware/verifyToken'

const router = express.Router()

router.route('/auth/login').post(verifyRequest, login)

router.route('/auth/refresh-token').post(verifyRefreshToken, refreshAccessToken)

export default router
