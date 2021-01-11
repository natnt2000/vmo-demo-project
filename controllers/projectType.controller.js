import { handleError } from '../helpers/response.helper'
import {
  getAllProjectTypeService,
  getOneProjectTypeService,
  createProjectTypeService,
  updateProjectTypeService,
  deleteProjectTypeService,
} from '../services/projectType.service'

const getAllProjectTypes = async (req, res) => {
  try {
    const data = await getAllProjectTypeService()
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const getOneProjectType = async (req, res) => {
  try {
    const data = await getOneProjectTypeService(req.params.id)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const createProjectType = async (req, res) => {
  try {
    const data = await createProjectTypeService(req.body)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const updateProjectType = async (req, res) => {
  try {
    const data = await updateProjectTypeService(req.params.id, req.body)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const deleteProjectType = async (req, res) => {
  try {
    const data = await deleteProjectTypeService(req.params.id)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

export {
  getAllProjectTypes,
  getOneProjectType,
  createProjectType,
  updateProjectType,
  deleteProjectType,
}
