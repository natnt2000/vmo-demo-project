import Department from '../models/department.model'
import { handleError, handleResponse } from '../helpers/response.helper'
import logger from '../helpers/logger.helper'

const getAllDepartmentsService = async (filter = {}) => {
  try {
    const departments = await Department.find(filter)
    return handleResponse('Get departments successfully', departments)
  } catch (error) {
    logger.error(new Error(error.message))

  }
}

const getOneDepartmentService = async (conditions) => {
  try {
    const populate = [
      { path: 'techStacks', select: 'name' },
      { path: 'projects', select: 'name' },
      { path: 'staffs', select: 'fullName' },
    ]

    const department = await Department.findOne(conditions).populate(populate)

    if (!department) return handleError('Department does not exist', 404)

    return handleResponse('Get department successfully', department)
  } catch (error) {
    logger.error(new Error(error.message))

  }
}

const createDepartmentService = async (data) => {
  try {
    const { name } = data
    const departmentExist = await Department.findOne({ name })

    if (departmentExist) return handleError('Department already exist', 400)

    const department = new Department(data)
    const newDepartment = await department.save()
    return handleResponse('Create department successfully', newDepartment)
  } catch (error) {
    logger.error(new Error(error.message))

  }
}

const updateDepartmentService = async (id, data) => {
  try {
    const { name } = data
    const department = await Department.findOne({ _id: id })

    if (!department) return handleError('Department does not exist', 404)

    if (name) {
      const departmentExist = await Department.findOne({ name })

      if (departmentExist && department.name !== name)
        return handleError('Department already exist', 400)
    }

    const updateDepartment = await Department.updateOne(
      { _id: id },
      { $set: data }
    )
    return handleResponse('Update department successfully', updateDepartment)
  } catch (error) {
    logger.error(new Error(error.message))

  }
}

const deleteDepartmentService = async (id) => {
  try {
    const department = await Department.findOne({ _id: id })

    if (!department) return handleError('Department does not exist', 404)

    const deleteDepartment = await Department.deleteOne({ _id: id })
    return handleResponse('Delete department successfully', deleteDepartment)
  } catch (error) {
    logger.error(new Error(error.message))

  }
}

export {
  getAllDepartmentsService,
  getOneDepartmentService,
  createDepartmentService,
  updateDepartmentService,
  deleteDepartmentService,
}
