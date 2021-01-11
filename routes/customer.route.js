import {
  getAllCustomers,
  getOneCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../controllers/customer.controller'
import verifyRequest from '../middleware/verifyRequest'
import express from 'express'
import { verifyAccessToken } from '../middleware/verifyToken'

const router = express.Router()

router.use(verifyAccessToken)

router.get('/', getAllCustomers)

router.get('/:id', getOneCustomer)

router.post('/', verifyRequest, createCustomer)

router.put('/:id', verifyRequest, updateCustomer)

router.delete('/:id', deleteCustomer)

export default router
