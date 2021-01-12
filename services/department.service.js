import Department from '../models/department.model'
import TechStack from '../models/techStack.model'
import Project from '../models/department.model'
import { handleError, handleResponse } from '../helpers/response.helper'
import logger from '../helpers/logger.helper'

const getAllDepartmentsService = async () => {
  try {
    const departments = await Department.find()
    return handleResponse('Get departments successfully', departments)
  } catch (error) {
    logger.error(error.message)
    console.log(error)
  }
}

const getOneDepartmentService = async (id) => {
  try {
    const populate = [
      { path: 'techStacks', select: 'name' },
      { path: 'projects', select: 'name' },
      { path: 'staffs', select: 'fullName' },
    ]

    const department = await Department.findOne({ _id: id }).populate(populate)

    if (!department) return handleError('Department does not exist', 404)

    return handleResponse('Get department successfully', department)
  } catch (error) {
    logger.error(error.message)
    console.log(error)
  }
}

const createDepartmentService = async (data) => {
  try {
    const departmentExist = await Department.findOne({ name: data.name })

    if (departmentExist) return handleError('Department already exist', 400)

    const checkRequest = await verifyRequestDepartment(data)

    if (checkRequest) return checkRequest

    const department = new Department(data)
    const newDepartment = await department.save()
    return handleResponse('Create department successfully', newDepartment)
  } catch (error) {
    logger.error(error.message)
    console.log(error)
  }
}

const updateDepartmentService = async (id, data) => {
  try {
    const department = await Department.findOne({ _id: id })
    const checkRequest = await verifyRequestDepartment(data)

    if (!department) return handleError('Department does not exist', 404)

    if (data.name) {
      const departmentExist = await Department.findOne({ name: data.name })

      if (departmentExist && department.name !== data.name)
        return handleError('Department already exist', 400)
    }

    if (checkRequest) return checkRequest

    const updateDepartment = await Department.updateOne(
      { _id: id },
      { $set: data }
    )
    return handleResponse('Update department successfully', updateDepartment)
  } catch (error) {
    logger.error(error.message)
    console.log(error)
  }
}

const deleteDepartmentService = async (id) => {
  try {
    const department = await Department.findOne({ _id: id })

    if (!department) return handleError('Department does not exist', 404)

    const deleteDepartment = await Department.deleteOne({ _id: id })
    return handleResponse('Delete department successfully', deleteDepartment)
  } catch (error) {
    logger.error(error.message)
    console.log(error)
  }
}

const verifyRequestDepartment = async (data) => {
  try {
    const { techStacks, projects } = data

    if (techStacks && techStacks.length > 0) {
      const techStacksExist = await TechStack.find({ _id: { $in: techStacks } })

      if (techStacksExist.length !== techStacks.length)
        return handleError('Tech stack in list incorrect', 400)
    }

    if (projects && projects.length > 0) {
      const projectsExist = await Project.find({ _id: { $in: projects } })

      if (projectsExist.length !== projects.length)
        return handleError('Project in list incorrect', 400)
    }
  } catch (error) {
    logger.error(error.message)
    console.log(error)
  }
}

export {
  getAllDepartmentsService,
  getOneDepartmentService,
  createDepartmentService,
  updateDepartmentService,
  deleteDepartmentService,
}
