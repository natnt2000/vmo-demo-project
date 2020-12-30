import Staff from '../models/staff.model'
import { handleError, handleResponse } from '../helpers/response.helper'

const getAllStaffsService = async () => {
    try {
        const staffs = await Staff.find()
        return handleResponse('Get staffs successfully', staffs)
    } catch (error) {
        console.log(error)
    }    
}

export { getAllStaffsService }