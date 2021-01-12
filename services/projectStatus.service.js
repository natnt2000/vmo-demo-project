import ProjectStatus from '../models/projectStatus.model.js'
import { handleResponse, handleError } from '../helpers/response.helper.js'
import logger from '../helpers/logger.helper.js'

const getAllProjectStatusesService = async () => {
  try {
    const projectStatuses = await ProjectStatus.find()
    return handleResponse('Get project statuses successfully', projectStatuses)
  } catch (error) {
    logger.error(error.message)
    console.log(error)
  }
}

const getOneProjectStatusService = async (id) => {
  try {
    const projectStatus = await ProjectStatus.findOne({ _id: id })

    if (!projectStatus) return handleError('Project status does not exist', 404)

    return handleResponse('Get project status successfully', projectStatus)
  } catch (error) {
    logger.error(error.message)
    console.log(error)
  }
}

const createProjectStatusService = async (data) => {
  try {
    const projectStatusExist = await ProjectStatus.findOne({ name: data.name })

    if (projectStatusExist)
      return handleError('Project status already exist', 400)

    const projectStatus = new ProjectStatus(data)
    const newProjectStatus = await projectStatus.save()
    return handleResponse(
      'Create new project status successfully',
      newProjectStatus
    )
  } catch (error) {
    logger.error(error.message)
    console.log(error)
  }
}

const updateProjectStatusService = async (id, data) => {
  try {
    const projectStatus = await ProjectStatus.findOne({ _id: id })

    if (!projectStatus) return handleError('Project status does not exist', 404)

    if (data.name) {
      const projectStatusExist = await ProjectStatus.findOne({ name: data.name })

      if (projectStatusExist && projectStatusExist.name !== data.name)
        return handleError('Project status name already exist', 400)
    }

    const updateProjectStatus = await ProjectStatus.updateOne(
      { _id: id },
      {
        $set: data,
      }
    )
    return handleResponse(
      'Update project status successfully',
      updateProjectStatus
    )
  } catch (error) {
    logger.error(error.message)
    console.log(error)
  }
}

const deleteProjectStatusService = async (id) => {
  try {
    const projectStatus = await getOneProjectStatusService(id)

    if (!projectStatus) return handleError('Project status does not exist', 404)

    const deleteProjectStatus = await ProjectStatus.deleteOne({ _id: id })
    return handleResponse(
      'Remove project status successfully',
      deleteProjectStatus
    )
  } catch (error) {
    logger.error(error.message)
    console.log(error)
  }
}

export {
  getAllProjectStatusesService,
  getOneProjectStatusService,
  createProjectStatusService,
  updateProjectStatusService,
  deleteProjectStatusService,
}
