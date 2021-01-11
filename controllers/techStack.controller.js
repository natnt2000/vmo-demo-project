import {
  getAllTechStacksService,
  getOneTechStackService,
  createTechStackService,
  updateTechStackService,
  deleteTechStackService,
} from '../services/techStack.service'
import { handleError } from '../helpers/response.helper'

const getAllTechStacks = async (req, res) => {
  try {
    const data = await getAllTechStacksService()
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const getOneTechStack = async (req, res) => {
  try {
    const data = await getOneTechStackService(req.params.id)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const createTechStack = async (req, res) => {
  try {
    const data = await createTechStackService(req.body)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const updateTechStack = async (req, res) => {
  try {
    const data = await updateTechStackService(req.params.id, req.body)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const deleteTechStack = async (req, res) => {
  try {
    const data = await deleteTechStackService(req.params.id)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

export {
  getAllTechStacks,
  getOneTechStack,
  createTechStack,
  updateTechStack,
  deleteTechStack,
}
