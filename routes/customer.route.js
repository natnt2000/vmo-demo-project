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

router.route('/customers')
  .get(getAllCustomers)
  .post(verifyRequest, createCustomer)

router.route('/customers/:id')
  .get(getOneCustomer)
  .put(verifyRequest, updateCustomer)
  .delete(deleteCustomer)

export default router
