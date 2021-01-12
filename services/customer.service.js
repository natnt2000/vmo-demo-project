import Customer from '../models/customer.model'
import { handleError, handleResponse } from '../helpers/response.helper'
import logger from '../helpers/logger.helper'

const getAllCustomersService = async (filter = {}) => {
  try {
    const customers = await Customer.find(filter)
    return handleResponse('Get customers successfully', customers)
  } catch (error) {
    logger.error(error.message)
    console.log(error)
  }
}

const getOneCustomerService = async (id) => {
  try {
    const customer = await Customer.findOne({ _id: id })

    if (!customer) return handleError('Customer does not exist', 404)

    return handleResponse('Get customer successfully', customer)
  } catch (error) {
    logger.error(error.message)
    console.log(error)
  }
}

const createCustomerService = async (data) => {
  try {
    const customerExist = await Customer.findOne({ name: data.name })

    if (customerExist) return handleError('Customer already exist', 400)

    const customer = new Customer(data)
    const newCustomer = await customer.save()
    return handleResponse('Create customer successfully', newCustomer)
  } catch (error) {
    logger.error(error.message)
    console.log(error)
  }
}

const updateCustomerService = async (id, data) => {
  try {
    const customer = await Customer.findOne({ _id: id })

    if (!customer) return handleError('Customer does not exist', 404)

    if (data.name) {
      const customerExist = await Customer.findOne({ name: data.name })

      if (customerExist && customer.name !== data.name)
        return handleError('Customer name already exist', 400)
    }

    const updateCustomer = await Customer.updateOne({ _id: id }, { $set: data })
    return handleResponse('Update customer successfully', updateCustomer)
  } catch (error) {
    logger.error(error.message)
    console.log(error)
  }
}

const deleteCustomerService = async (id) => {
  try {
    const customer = await Customer.findOne({ _id: id })

    if (!customer) return handleError('Customer does not exist', 404)

    const deleteCustomer = await Customer.deleteOne({ _id: id })
    return handleResponse('Delete customer successfully', deleteCustomer)
  } catch (error) {
    logger.error(error.message)
    console.log(error)
  }
}

export {
  getAllCustomersService,
  getOneCustomerService,
  createCustomerService,
  updateCustomerService,
  deleteCustomerService,
}
