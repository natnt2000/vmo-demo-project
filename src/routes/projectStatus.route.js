import {
  getAllProjectStatuses,
  getOneProjectStatus,
  createProjectStatus,
  updateProjectStatus,
  deleteProjectStatus,
} from '../controllers/projectStatus.controller'
import verifyRequest from '../middleware/verifyRequest'
import express from 'express'
import { verifyAccessToken } from '../middleware/verifyToken'

const router = express.Router()

router.use(verifyAccessToken)

router.route('/projectStatuses')
  .get(getAllProjectStatuses)
  .post(verifyRequest, createProjectStatus)

router.route('/projectStatuses/:id')
  .get(getOneProjectStatus)
  .put(verifyRequest, updateProjectStatus)
  .delete(deleteProjectStatus)

export default router
