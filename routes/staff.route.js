import { getAllStaffs } from '../controllers/staff.controller'
import verifyRequest from '../middleware/verifyRequest'
import express from 'express'

const router = express.Router()

router.get('/', getAllStaffs)

export default router