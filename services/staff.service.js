import Staff from '../models/staff.model'
import TechStack from '../models/techStack.model'
import { handleError, handleResponse } from '../helpers/response.helper'
import logger from '../helpers/logger.helper'

const getAllStaffsService = async query => {
    try {
        const { experience, techStack, certificate, page, limit, joiningProjects } = query
        const pageNumber = parseInt(page) < 0 || !page ? 0 : parseInt(page) - 1
        const limitNumber = parseInt(limit) || 5
        const skip = pageNumber * limitNumber
        const conditions = {
            $and: [
                experience || techStack ? {
                    skills: {
                        $elemMatch: {
                            $and: [
                                techStack ? { techStack } : {},
                                experience ? { experience } : {}
                            ]
                        }
                    }
                } : {},
                certificate ? { certificates: certificate } : {},
                joiningProjects ? { projects: { $size: parseInt(joiningProjects) } } : {}
            ]
        }

        const staffs = await Staff.find(conditions).sort({ createdAt: -1 }).skip(skip).limit(limitNumber)
        const totalItems = await Staff.find(conditions).countDocuments()

        return handleResponse('Get staffs successfully', { totalItems, staffs })
    } catch (error) {
        logger.error(error.message)
        console.log(error)
    }
}

const getOneStaffService = async id => {
    try {
        const populate = [
            {
                path: 'projects',
                select: '-staffs',
                populate: [
                    { path: 'projectType', select: 'name' },
                    { path: 'projectStatus', select: 'name' },
                    { path: 'techStack', select: 'name' },
                    { path: 'department', select: 'name' }
                ]
            },
            { path: 'skills.techStack', select: 'name' }
        ]
        const staff = await Staff.findOne({ _id: id }).populate(populate)

        if (!staff) return handleError('Staff does not exist', 404)

        return handleResponse('Get staff successfully', staff)
    } catch (error) {
        logger.error(error.message)
        console.log(error)
    }
}

const createStaffService = async data => {
    try {
        const { identificationNumber, phoneNumber } = data

        const staffExist = await Staff.findOne({
            $or: [
                { identificationNumber },
                { phoneNumber }
            ]
        })

        if (staffExist) return handleError('Staff already exist', 400)

        const checkRequest = await verifyRequestStaff(data)

        if (checkRequest) return checkRequest

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
        const staff = await Staff.findOne({ _id: id })

        if (!staff) return handleError('Staff does not exist', 404)

        const { identificationNumber, phoneNumber } = data

        if (identificationNumber) {
            const staffExist = await Staff.findOne({ identificationNumber })

            if (staffExist && identificationNumber !== staff.identificationNumber) return handleError('Staff already exist', 400)
        }

        if (phoneNumber) {
            const staffExist = await Staff.findOne({ phoneNumber })

            if (staffExist && phoneNumber !== staff.phoneNumber) return handleError('Staff already exist', 400)
        }

        const checkRequest = await verifyRequestStaff(data)

        if (checkRequest) return checkRequest

        const updateStaff = await Staff.updateOne({ _id: id }, { $set: data })
        return handleResponse('Update staff successfully', updateStaff)
    } catch (error) {
        logger.error(error.message)
        console.log(error)
    }
}

const deleteStaffService = async id => {
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

const verifyRequestStaff = async data => {
    try {
        const { skills } = data

        if (skills) {
            const techStacksId = skills.map(val => val.techStack)
            const techStacks = await TechStack.find({ _id: { $in: techStacksId } })

            if (techStacks.length !== techStacksId.length) return handleError('Tech stacks incorrect', 400)
        }
    } catch (error) {
        logger.error(error.message)
        console.log(error)
    }
}

export { getAllStaffsService, getOneStaffService, createStaffService, updateStaffService, deleteStaffService }