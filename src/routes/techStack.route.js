import {
  getAllTechStacks,
  getOneTechStack,
  createTechStack,
  updateTechStack,
  deleteTechStack,
} from '../controllers/techStack.controller'
import verifyRequest from '../middleware/verifyRequest'
import express from 'express'
import { verifyAccessToken } from '../middleware/verifyToken'

const router = express.Router()

router.use(verifyAccessToken)

router.route('/techStacks')
  .get(getAllTechStacks)
  .post(verifyRequest, createTechStack)

router.route('/techStacks/:id')
  .get(getOneTechStack)
  .put(verifyRequest, updateTechStack)
  .delete(deleteTechStack)

export default router
