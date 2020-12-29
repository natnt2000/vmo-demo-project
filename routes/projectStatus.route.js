import { getAllProjectStatuses, getOneProjectStatus, createProjectStatus, updateProjectStatus, deleteProjectStatus } from '../controllers/projectStatus.controller'
import verifyRequest from '../middleware/verifyRequest'
import express from 'express'

const router = express.Router()

router.get('/', getAllProjectStatuses)

router.get('/:id', getOneProjectStatus)

router.post('/', verifyRequest, createProjectStatus)

router.put('/:id', verifyRequest, updateProjectStatus)

router.delete('/:id', deleteProjectStatus)

export default router