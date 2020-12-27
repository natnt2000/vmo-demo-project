import ProjectStatus from '../models/projectStatus.model.js'
import handleResponse from '../helpers/response.helper.js'

const getAll = async (req, res) => {
    try {
        const projectStatuses = await ProjectStatus.find()
        return res.json(handleResponse('Get projectStatuses successfully', projectStatuses))
    } catch (error) {
        return res.json(error)
    }
}

const getOne = async (req, res) => {
    try {
        const projectStatus = await ProjectStatus.findOne({ _id: req.params.id })
        return res.json(handleResponse('Get projectStatus successfully', projectStatus))
    } catch (error) {
        return res.json(error)
    }
}

const create = async (req, res) => {
    try {
        const projectStatus = new ProjectStatus({ ...req.body })
        const newProjectStatus = await projectStatus.save()
        return res.json(handleResponse('Create new projectStatus successfully', newProjectStatus))
    } catch (error) {
        return res.json(error)
    }
}

const update = async (req, res) => {
    try {
        const updateProjectStatus = await ProjectStatus.updateOne(
            { _id: req.params.id },
            {
                $set: { ...req.body }
            }
        )
        return res.json(handleResponse('Update projectStatus successfully', updateProjectStatus))
    } catch (error) {
        return res.json(error)
    }
}

const remove = async (req, res) => {
    try {
        const removeProjectStatus = await ProjectStatus.deleteOne({ _id: req.params.id })
        return res.json(handleResponse('Remove projectStatus successfully', removeProjectStatus))
    } catch (error) {
        return res.json(error)
    }
}

export { getAll, getOne, create, update, remove }