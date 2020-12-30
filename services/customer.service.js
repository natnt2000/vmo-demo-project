import Customer from '../models/customer.model'
import { handleError, handleResponse } from '../helpers/response.helper'

const getAllCustomersService = async () => {
    try {
        const customers = await Customer.find()
        return handleResponse('Get customers successfully', customers)
    } catch (error) {
        console.log(error)
    }
}

const getOneCustomerService = async id => {
    try {
        const customer = await Customer.findOne({ _id: id })

        if (!customer) return handleError('Customer does not exist', 404)

        return handleResponse('Get customer successfully', customer)
    } catch (error) {
        console.log(error)
    }
}

const createCustomerService = async data => {
    try {
        const customerExist = await Customer.findOne({ name: { $regex: data.name, $options: 'i' } })

        if (customerExist) return handleError('Customer already exist', 400)

        const customer = new Customer(data)
        const newCustomer = await customer.save()
        return handleResponse('Create customer successfully', newCustomer)
    } catch (error) {
        console.log(error)
    }
}

const updateCustomerService = async (id, data) => {
    try {
        const customer = await Customer.findOne({ _id: id })

        if (!customer) return handleError('Customer does not exist', 404)

        const updateCustomer = await Customer.updateOne({ _id: id }, { $set: data })
        return handleResponse('Update customer successfully', updateCustomer)
    } catch (error) {
        console.log(error)
    }
}

const deleteCustomerService = async id => {
    try {
        const customer = await Customer.findOne({ _id: id })

        if (!customer) return handleError('Customer does not exist', 404)

        const deleteCustomer = await Customer.deleteOne({ _id: id })
        return handleResponse('Delete customer successfully', deleteCustomer)
    } catch (error) {
        console.log(error)
    }
}

export { getAllCustomersService, getOneCustomerService, createCustomerService, updateCustomerService, deleteCustomerService }