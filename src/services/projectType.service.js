import ProjectType from '../models/projectType.model'
import { handleError, handleResponse } from '../helpers/response.helper'
import logger from '../helpers/logger.helper'

const getAllProjectTypeService = async (filter = {}) => {
  try {
    const projectTypes = await ProjectType.find(filter)
    return handleResponse('Get project types successfully', projectTypes)
  } catch (error) {
    logger.error(new Error(error.message))

  }
}

const getOneProjectTypeService = async (conditions) => {
  try {
    const projectType = await ProjectType.findOne(conditions)

    if (!projectType) return handleError('Project type does not exist', 404)

    return handleResponse('Get project type successfully', projectType)
  } catch (error) {
    logger.error(new Error(error.message))

  }
}

const createProjectTypeService = async (data) => {
  try {
    const projectTypeExist = await ProjectType.findOne({ name: data.name })

    if (projectTypeExist) return handleError('Project type already exist', 400)

    const projectType = new ProjectType(data)
    const newProjectType = await projectType.save()
    return handleResponse(
      'Create new project type successfully',
      newProjectType
    )
  } catch (error) {
    logger.error(new Error(error.message))

  }
}

const updateProjectTypeService = async (id, data) => {
  try {
    const projectType = await ProjectType.findOne({ _id: id })

    if (!projectType) return handleError('Project type does not exist', 404)

    if (data.name) {
      const projectTypeExist = await ProjectType.findOne({ name: data.name })

      if (projectTypeExist && projectType.name !== data.name)
        return handleError('Project type name already exist', 400)
    }

    const updateProjectType = await ProjectType.updateOne(
      { _id: id },
      {
        $set: data,
      }
    )
    return handleResponse('Update project type successfully', updateProjectType)
  } catch (error) {
    logger.error(new Error(error.message))

  }
}

const deleteProjectTypeService = async (id) => {
  try {
    const projectType = await ProjectType.findOne({ _id: id })

    if (!projectType) return handleError('Project type does not exist', 404)

    const deleteProjectType = await ProjectType.deleteOne({ _id: id })
    return handleResponse('Remove project type successfully', deleteProjectType)
  } catch (error) {
    logger.error(new Error(error.message))

  }
}

export {
  getAllProjectTypeService,
  getOneProjectTypeService,
  createProjectTypeService,
  updateProjectTypeService,
  deleteProjectTypeService,
}
