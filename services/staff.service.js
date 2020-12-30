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
        const checkExist = await verifyRequestStaff(data)

        if (checkExist) return checkExist

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

        const checkExist = await verifyRequestStaff(data, staff)

        if (checkExist) return checkExist

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

const verifyRequestStaff = async (data, staff = {}) => {
    try {
        const { identificationNumber, phoneNumber, skills } = data
        const identificationNumberExist = await Staff.findOne({ identificationNumber })
        const phoneNumberExist = await Staff.findOne({ phoneNumber })
        
        if (
            identificationNumberExist && !staff || 
            phoneNumberExist && !staff || 
            staff && identificationNumberExist && identificationNumber !== staff.identificationNumber || 
            staff && phoneNumberExist && phoneNumber !== staff.phoneNumber
        ) return handleError('Staff already exist', 400)
        
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