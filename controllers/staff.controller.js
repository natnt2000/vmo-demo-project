import {
  getAllStaffsService,
  getOneStaffService,
  createStaffService,
  updateStaffService,
  deleteStaffService,
} from '../services/staff.service'
import { handleError } from '../helpers/response.helper'
import { getTechStackLengthService } from '../services/techStack.service'

const getAllStaffs = async (req, res) => {
  try {
    const data = await getAllStaffsService(req.query)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const getOneStaff = async (req, res) => {
  try {
    const data = await getOneStaffService(req.params.id)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const createStaff = async (req, res) => {
  try {
    const { skills } = req.body

    if (skills) {
      const techStacksId = skills.map((val) => val.techStack)
      const techStackLength = await getTechStackLengthService({ _id: { $in: techStacksId } })

      if (techStackLength.data !== techStacksId.length) return res.status(400).json(handleError('Tech stacks incorrect', 400))
    }

    const data = await createStaffService(req.body)
    return res.status(data.status).json(data)
  } catch (error) {
    console.log(error)
    return res.status(500).json(handleError(error.message, 500))
  }
}

const updateStaff = async (req, res) => {
  try {
    const { skills } = req.body
    
    if (skills) {
      const techStacksId = skills.map((val) => val.techStack)
      const techStackLength = await getTechStackLengthService({ _id: { $in: techStacksId } })

      if (techStackLength.data !== techStacksId.length) return res.status(400).json(handleError('Tech stacks incorrect', 400))
    }

    const data = await updateStaffService(req.params.id, req.body)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const deleteStaff = async (req, res) => {
  try {
    const data = await deleteStaffService(req.params.id)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

export { getAllStaffs, getOneStaff, createStaff, updateStaff, deleteStaff }
