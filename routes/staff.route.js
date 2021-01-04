import { createStaff, deleteStaff, getAllStaffs, getOneStaff, updateStaff } from '../controllers/staff.controller'
import verifyRequest from '../middleware/verifyRequest'
import express from 'express'

const router = express.Router()

router.get('/', getAllStaffs)

router.get('/:id', getOneStaff)

router.post('/', verifyRequest, createStaff)

router.put('/:id', verifyRequest, updateStaff)

router.delete('/:id', deleteStaff)

export default router