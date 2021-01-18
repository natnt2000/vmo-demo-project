import TechStack from '../models/techStack.model'
import { handleError, handleResponse } from '../helpers/response.helper'
import logger from '../helpers/logger.helper'

const getAllTechStacksService = async (filter = {}) => {
  try {
    const techStacks = await TechStack.find(filter)
    return handleResponse('Get tech stacks successfully', techStacks)
  } catch (error) {
    logger.error(new Error(error.message))

  }
}

const getTechStackLengthService = async (conditions = {}) => {
  try {
    const techStackLength = await TechStack.countDocuments(conditions)
    return handleResponse('Get tech stacks length successfully', techStackLength)
  } catch (error) {
    logger.error(new Error(error.message))

  }
}

const getOneTechStackService = async (conditions) => {
  try {
    const techStack = await TechStack.findOne(conditions)

    if (!techStack) return handleError('Tech stack does not exist', 404)

    return handleResponse('Get tech stack successfully', techStack)
  } catch (error) {
    logger.error(new Error(error.message))

  }
}

const createTechStackService = async (data) => {
  try {
    const techStackExist = await TechStack.findOne({ name: data.name })

    if (techStackExist) return handleError('Tech stack already exist', 400)

    const techStack = new TechStack(data)
    const newTechStack = await techStack.save()
    return handleResponse('Create tech stack successfully', newTechStack)
  } catch (error) {
    logger.error(new Error(error.message))

  }
}

const updateTechStackService = async (id, data) => {
  try {
    const techStack = await TechStack.findOne({ _id: id })

    if (!techStack) return handleError('Tech stack does not exist', 404)

    if (data.name) {
      const techStackExist = await TechStack.findOne({ name: data.name })

      if (techStackExist && techStack.name !== data.name)
        return handleError('Tech stack already exist', 400)
    }

    const updateTechStack = await TechStack.updateOne(
      { _id: id },
      {
        $set: data,
      }
    )

    return handleResponse('Update tech stack successfully', updateTechStack)
  } catch (error) {
    logger.error(new Error(error.message))

  }
}

const deleteTechStackService = async (id) => {
  try {
    const techStack = await TechStack.findOne({ _id: id })

    if (!techStack) return handleError('Tech stack does not exist', 404)

    const deleteTechStack = await TechStack.deleteOne({ _id: id })
    return handleResponse('Delete tech stack successfully', deleteTechStack)
  } catch (error) {
    logger.error(new Error(error.message))

  }
}

export {
  getAllTechStacksService,
  getOneTechStackService,
  createTechStackService,
  updateTechStackService,
  deleteTechStackService,
  getTechStackLengthService,
}
