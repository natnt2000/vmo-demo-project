import {
  getAllCustomersService,
  getOneCustomerService,
  createCustomerService,
  updateCustomerService,
  deleteCustomerService,
} from '../services/customer.service'
import { handleError } from '../helpers/response.helper'

const getAllCustomers = async (req, res) => {
  try {
    const data = await getAllCustomersService()
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError('Internal Server Error', 500))
  }
}

const getOneCustomer = async (req, res) => {
  try {
    const data = await getOneCustomerService({ _id: req.params.id })
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError('Internal Server Error', 500))
  }
}

const createCustomer = async (req, res) => {
  try {
    const data = await createCustomerService(req.body)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError('Internal Server Error', 500))
  }
}

const updateCustomer = async (req, res) => {
  try {
    const data = await updateCustomerService(req.params.id, req.body)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError('Internal Server Error', 500))
  }
}

const deleteCustomer = async (req, res) => {
  try {
    const data = await deleteCustomerService(req.params.id)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError('Internal Server Error', 500))
  }
}

export {
  getAllCustomers,
  getOneCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
}
