import { createUser, getAllUsers } from '../controllers/user.controller'
import express from 'express'
import verifyRequest from '../middleware/verifyRequest'
import { verifyAccessToken } from '../middleware/verifyToken'

const router = express.Router()

router.use(verifyAccessToken)

router.route('/users')
  .get(getAllUsers)
  .post(verifyRequest, createUser)

export default router
