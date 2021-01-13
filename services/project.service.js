import Project from '../models/project.model'
import { handleError, handleResponse } from '../helpers/response.helper'
import logger from '../helpers/logger.helper'

const getAllProjectsService = async (query) => {
  try {
    const {
      from,
      to,
      projectStatus,
      projectType,
      techStack,
      page,
      limit,
    } = query
    const pageNumber = parseInt(page) < 0 || !page ? 0 : parseInt(page) - 1
    const limitNumber = parseInt(limit) || 5
    const skip = pageNumber * limitNumber
    const conditions = {
      $and: [
        projectStatus ? { projectStatus } : {},
        projectType ? { projectType } : {},
        techStack ? { techStack } : {},
        {
          createdAt: {
            $gte: from ? new Date(from) : new Date('1970-01-01'),
            $lte: to ? new Date(to).setHours(23, 59, 59) : new Date(),
          },
        },
      ],
    }

    const projects = await Project.find(conditions)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber)
    const totalItems = await Project.find(conditions).countDocuments()
    return handleResponse('Get projects successfully', { totalItems, projects })
  } catch (error) {
    logger.error(error.message)
    console.log(error)
  }
}

const getProjectLengthService = async (conditions = {}) => {
  try {
    const projectLength = await Project.countDocuments(conditions)
    return handleResponse('Get project length successfully', projectLength)
  } catch (error) {
    logger.error(error.message)
    console.log(error)
  }
}

const getOneProjectService = async (id) => {
  try {
    const populate = [
      { path: 'projectType', select: 'name' },
      { path: 'projectStatus', select: 'name' },
      { path: 'techStack', select: 'name' },
      { path: 'department', select: 'name' },
      { path: 'staffs', select: 'fullName' },
    ]
    const project = await Project.findOne({ _id: id }).populate(populate)

    if (!project) return handleError('Project does not exist', 404)

    return handleResponse('Get project successfully', project)
  } catch (error) {
    logger.error(error.message)
    console.log(error)
  }
}

const createProjectService = async (data) => {
  try {
    const projectExist = await Project.findOne({ name: data.name })

    if (projectExist) return handleError('Project name already exist', 400)

    const project = new Project(data)
    const newProject = await project.save()
    return handleResponse('Create project successfully', newProject)
  } catch (error) {
    logger.error(error.message)
    console.log(error)
  }
}

const updateProjectService = async (id, data) => {
  try {
    const project = await Project.findOne({ _id: id })
    const { name } = data

    if (!project) return handleError('Project does not exist', 404)

    if (name) {
      const projectExist = await Project.findOne({ name: data.name })

      if (projectExist && project.name !== name)
        return handleError('Project name already exist', 400)
    }

    const updateProject = await Project.updateOne({ _id: id }, { $set: data })
    return handleResponse('Update project successfully', updateProject)
  } catch (error) {
    logger.error(error.message)
    console.log(error)
  }
}

const deleteProjectService = async (id) => {
  try {
    const project = await Project.findOne({ _id: id })

    if (!project) return handleError('Project does not exist', 404)

    const deleteProject = await Project.deleteOne({ _id: id })
    return handleResponse('Delete project successfully', deleteProject)
  } catch (error) {
    logger.error(error.message)
    console.log(error)
  }
}

export {
  getAllProjectsService,
  getOneProjectService,
  createProjectService,
  updateProjectService,
  deleteProjectService,
  getProjectLengthService
}
