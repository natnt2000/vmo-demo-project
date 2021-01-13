import {
  getAllDepartmentsService,
  getOneDepartmentService,
  createDepartmentService,
  updateDepartmentService,
  deleteDepartmentService,
} from '../services/department.service'
import { getTechStackLengthService } from '../services/techStack.service'
import { getProjectLengthService } from '../services/project.service'

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
    const { techStacks, projects } = req.body
    
    if (techStacks) {
      const techStackLength = await getTechStackLengthService({ _id: { $in: techStacks } })

      if (techStacks.length !== techStackLength.data) return res.status(400).json(handleError('Tech stack in list incorrect', 400))
    }

    if (projects) {
      const projectLength = await getProjectLengthService({ _id: { $in: projects } })

    if (projects.length !== projectLength) return res.status(400).json(handleError('Project in list incorrect', 400))
    }

    const data = await createDepartmentService(req.body)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const updateDepartment = async (req, res) => {
  try {
    const { techStacks, projects } = req.body
    
    if (techStacks) {
      const techStackLength = await getTechStackLengthService({ _id: { $in: techStacks } })

      if (techStacks.length !== techStackLength.data) return res.status(400).json(handleError('Tech stack in list incorrect', 400))
    }

    if (projects) {
      const projectLength = await getProjectLengthService({ _id: { $in: projects } })

    if (projects.length !== projectLength.data) return res.status(400).handleError('Project in list incorrect', 400)
    }

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
