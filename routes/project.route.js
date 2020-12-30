import verifyRequest from '../middleware/verifyRequest'
import express from 'express'
import { createProject, getAllProjects, getOneProject, updateProject, deleteProject } from '../controllers/project.controller'

const router = express.Router()

router.get('/', getAllProjects)

router.get('/:id', getOneProject)

router.post('/', verifyRequest, createProject)

router.put('/:id', verifyRequest, updateProject)

router.delete('/:id', deleteProject)

export default router