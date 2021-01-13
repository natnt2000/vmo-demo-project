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

router.route('/departments')
  .get(getAllDepartments)
  .post(verifyRequest, createDepartment)

router.route('/departments/:id')
  .get(getOneDepartment)
  .put(verifyRequest, updateDepartment)
  .delete(deleteDepartment)

export default router
