import express from 'express'
import { login, refreshAccessToken } from '../controllers/auth.controller'
import verifyRequest from '../middleware/verifyRequest'
import { verifyRefreshToken } from '../middleware/verifyToken'

const router = express.Router()

router.post('/login', verifyRequest, login)

router.post('/refresh-token', verifyRefreshToken, refreshAccessToken)

export default router
