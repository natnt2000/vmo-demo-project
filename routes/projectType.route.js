import { getAllProjectTypes, getOneProjectType, createProjectType, updateProjectType, deleteProjectType } from '../controllers/projectType.controller'
import verifyRequest from '../middleware/verifyRequest'
import express from 'express'

const router = express.Router()

router.get('/', getAllProjectTypes)

router.get('/:id', getOneProjectType)

router.post('/', verifyRequest, createProjectType)

router.put('/:id', verifyRequest, updateProjectType)

router.delete('/:id', deleteProjectType)

export default router

