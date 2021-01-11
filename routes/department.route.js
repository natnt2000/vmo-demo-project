import {
  getAllDepartments,
  getOneDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from '../controllers/department.controller'
import verifyRequest from '../middleware/verifyRequest'
import express from 'express'
import { verifyAccessToken } from '../middleware/verifyToken'

const router = express.Router()

router.use(verifyAccessToken)

router.get('/', getAllDepartments)

router.get('/:id', getOneDepartment)

router.post('/', verifyRequest, createDepartment)

router.put('/:id', verifyRequest, updateDepartment)

router.delete('/:id', deleteDepartment)

export default router
