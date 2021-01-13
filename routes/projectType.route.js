import {
  getAllProjectTypes,
  getOneProjectType,
  createProjectType,
  updateProjectType,
  deleteProjectType,
} from '../controllers/projectType.controller'
import verifyRequest from '../middleware/verifyRequest'
import express from 'express'
import { verifyAccessToken } from '../middleware/verifyToken'

const router = express.Router()

router.use(verifyAccessToken)

router.route('/projectTypes')
  .get(getAllProjectTypes)
  .post(verifyRequest, createProjectType)

router.route('/projectTypes/:id')
  .get(getOneProjectType)
  .put(verifyRequest, updateProjectType)
  .delete(deleteProjectType)

export default router
