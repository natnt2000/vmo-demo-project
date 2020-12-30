import { getAllStaffsService } from '../services/staff.service'
import { handleError } from '../helpers/response.helper'

const getAllStaffs = async (req, res) => {
    try {
        const data = await getAllStaffsService()
        return res.status(data.status).json(data)
    } catch (error) {
        return res.status(500).json(handleError(error.message, 500))
    }
}

export { getAllStaffs }