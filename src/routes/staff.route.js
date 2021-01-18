import {
  createStaff,
  deleteStaff,
  getAllStaffs,
  getOneStaff,
  updateStaff,
} from '../controllers/staff.controller'
import verifyRequest from '../middleware/verifyRequest'
import express from 'express'
import { verifyAccessToken } from '../middleware/verifyToken'

const router = express.Router()

router.use(verifyAccessToken)

router.route('/staffs')
  .get(getAllStaffs)
  .post(verifyRequest, createStaff)

router.route('/staffs/:id')
  .get(getOneStaff)
  .put(verifyRequest, updateStaff)
  .delete(deleteStaff)

export default router
