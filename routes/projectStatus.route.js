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

router.get('/', getAllProjectStatuses)

router.get('/:id', getOneProjectStatus)

router.post('/', verifyRequest, createProjectStatus)

router.put('/:id', verifyRequest, updateProjectStatus)

router.delete('/:id', deleteProjectStatus)

export default router
