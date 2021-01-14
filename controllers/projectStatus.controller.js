import { handleError } from '../helpers/response.helper.js'
import {
  getAllProjectStatusesService,
  getOneProjectStatusService,
  createProjectStatusService,
  updateProjectStatusService,
  deleteProjectStatusService,
} from '../services/projectStatus.service'

const getAllProjectStatuses = async (req, res) => {
  try {
    const data = await getAllProjectStatusesService()
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const getOneProjectStatus = async (req, res) => {
  try {
    const data = await getOneProjectStatusService({ _id: req.params.id })
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const createProjectStatus = async (req, res) => {
  try {
    const data = await createProjectStatusService(req.body)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const updateProjectStatus = async (req, res) => {
  try {
    const data = await updateProjectStatusService(req.params.id, req.body)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const deleteProjectStatus = async (req, res) => {
  try {
    const data = await deleteProjectStatusService(req.params.id)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

export {
  getAllProjectStatuses,
  getOneProjectStatus,
  createProjectStatus,
  updateProjectStatus,
  deleteProjectStatus,
}
