import verifyRequest from '../middleware/verifyRequest'
import express from 'express'
import {
  createProject,
  getAllProjects,
  getOneProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller'
import { verifyAccessToken } from '../middleware/verifyToken'

const router = express.Router()

router.use(verifyAccessToken)

router.route('/projects')
  .get(getAllProjects)
  .post(verifyRequest, createProject)
  
router.route('/projects/:id')
  .get(getOneProject)
  .put(verifyRequest, updateProject)
  .delete(deleteProject)

export default router
