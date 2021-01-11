import {
  getAllDepartmentsService,
  getOneDepartmentService,
  createDepartmentService,
  updateDepartmentService,
  deleteDepartmentService,
} from '../services/department.service'
import { handleError } from '../helpers/response.helper'

const getAllDepartments = async (req, res) => {
  try {
    const data = await getAllDepartmentsService()
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const getOneDepartment = async (req, res) => {
  try {
    const data = await getOneDepartmentService(req.params.id)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const createDepartment = async (req, res) => {
  try {
    const data = await createDepartmentService(req.body)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const updateDepartment = async (req, res) => {
  try {
    const data = await updateDepartmentService(req.params.id, req.body)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const deleteDepartment = async (req, res) => {
  try {
    const data = await deleteDepartmentService(req.params.id)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

export {
  getAllDepartments,
  getOneDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
}
