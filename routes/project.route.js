import verifyRequest from '../middleware/verifyRequest'
import express from 'express'
import { createProject, getAllProjects, getOneProject, updateProject, deleteProject } from '../controllers/project.controller'
import { verifyAccessToken } from '../middleware/verifyToken'

const router = express.Router()

router.use(verifyAccessToken)

router.get('/', getAllProjects)

router.get('/:id', getOneProject)

router.post('/', verifyRequest, createProject)

router.put('/:id', verifyRequest, updateProject)

router.delete('/:id', deleteProject)

export default router