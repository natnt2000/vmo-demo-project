import { handleError } from '../helpers/response.helper'
import {
  createProjectService,
  deleteProjectService,
  getAllProjectsService,
  getOneProjectService,
  updateProjectService,
} from '../services/project.service'

const getAllProjects = async (req, res) => {
  try {
    const data = await getAllProjectsService(req.query)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const getOneProject = async (req, res) => {
  try {
    const data = await getOneProjectService(req.params.id)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const createProject = async (req, res) => {
  try {
    const data = await createProjectService(req.body)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const updateProject = async (req, res) => {
  try {
    const data = await updateProjectService(req.params.id, req.body)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const deleteProject = async (req, res) => {
  try {
    const data = await deleteProjectService(req.params.id)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

export {
  getAllProjects,
  getOneProject,
  createProject,
  updateProject,
  deleteProject,
}
