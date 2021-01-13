import Staff from '../models/staff.model'
import { handleError, handleResponse } from '../helpers/response.helper'
import logger from '../helpers/logger.helper'

const getAllStaffsService = async (query) => {
  try {
    const {
      experience,
      techStack,
      certificate,
      page,
      limit,
      joiningProjects,
    } = query
    const pageNumber = parseInt(page) < 0 || !page ? 0 : parseInt(page) - 1
    const limitNumber = parseInt(limit) || 5
    const skip = pageNumber * limitNumber
    const conditions = {
      $and: [
        experience || techStack
          ? {
            skills: {
              $elemMatch: {
                $and: [
                  techStack ? { techStack } : {},
                  experience ? { experience } : {},
                ],
              },
            },
          }
          : {},
        certificate ? { certificates: certificate } : {},
        joiningProjects
          ? { projects: { $size: parseInt(joiningProjects) } }
          : {},
      ],
    }

    const staffs = await Staff.find(conditions)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber)
    const totalItems = await Staff.find(conditions).countDocuments()

    return handleResponse('Get staffs successfully', { totalItems, staffs })
  } catch (error) {
    logger.error(error.message)
    console.log(error)
  }
}

const getStaffLengthService = async (conditions = {}) => {
    try {
      const staffLength = await Staff.countDocuments(conditions)
      return handleResponse('Get staff length successfully', staffLength)
    } catch (error) {
      logger.error(error.message)
      console.log(error)
    }
}

const getOneStaffService = async (id) => {
  try {
    const populate = [
      {
        path: 'projects',
        select: '-staffs',
        populate: [
          { path: 'projectType', select: 'name' },
          { path: 'projectStatus', select: 'name' },
          { path: 'techStack', select: 'name' },
          { path: 'department', select: 'name' },
        ],
      },
      { path: 'skills.techStack', select: 'name' },
    ]
    const staff = await Staff.findOne({ _id: id }).populate(populate)

    if (!staff) return handleError('Staff does not exist', 404)

    return handleResponse('Get staff successfully', staff)
  } catch (error) {
    logger.error(error.message)
    console.log(error)
  }
}

const createStaffService = async (data) => {
  try {
    const { identificationNumber, phoneNumber } = data

    const staffExist = await Staff.findOne({
      $or: [{ identificationNumber }, { phoneNumber }],
    })

    if (staffExist) return handleError('Staff already exist', 400)

    const staff = new Staff(data)
    const newStaff = await staff.save()
    return handleResponse('Create staff successfully', newStaff)
  } catch (error) {
    logger.error(error.message)
    console.log(error)
  }
}

const updateStaffService = async (id, data) => {
  try {
    const { identificationNumber, phoneNumber } = data
    const staff = await Staff.findOne({ _id: id })

    if (!staff) return handleError('Staff does not exist', 404)

    if (identificationNumber || phoneNumber) {
      const staffExist = await Staff.findOne({
        $or: [
          identificationNumber ? { identificationNumber } : {},
          phoneNumber ? { phoneNumber } : {}
        ]
      })

      if (staffExist && identificationNumber !== staff.identificationNumber || staffExist && phoneNumber !== staff.phoneNumber) return handleError('Staff already exist', 400)
    }

    const updateStaff = await Staff.updateOne({ _id: id }, { $set: data })
    return handleResponse('Update staff successfully', updateStaff)
  } catch (error) {
    logger.error(error.message)
    console.log(error)
  }
}

const deleteStaffService = async (id) => {
  try {
    const staff = await Staff.findOne({ _id: id })

    if (!staff) return handleError('Staff does not exist', 404)

    const deleteStaff = await Staff.deleteOne({ _id: id })
    return handleResponse('Delete staff successfully', deleteStaff)
  } catch (error) {
    logger.error(error.message)
    console.log(error)
  }
}

export {
  getAllStaffsService,
  getOneStaffService,
  createStaffService,
  updateStaffService,
  deleteStaffService,
  getStaffLengthService
}
