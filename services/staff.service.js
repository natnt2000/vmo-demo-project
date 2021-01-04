import Staff from '../models/staff.model'
import TechStack from '../models/techStack.model'
import { handleError, handleResponse } from '../helpers/response.helper'

const getAllStaffsService = async () => {
    try {
        const staffs = await Staff.find()
        return handleResponse('Get staffs successfully', staffs)
    } catch (error) {
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
        console.log(error)
    }
}

export { getAllStaffsService, getOneStaffService, createStaffService, updateStaffService, deleteStaffService }