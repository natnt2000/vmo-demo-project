import ProjectType from '../models/projectType.model'
import { handleError, handleResponse } from '../helpers/response.helper'

const getAllProjectTypeService = async () => {
    try {
        const projectTypes = await ProjectType.find()
        return handleResponse('Get project types successfully', projectTypes)
    } catch (error) {
        console.log(error)
    }
}

const getOneProjectTypeService = async (id) => {
    try {
        const projectType = await ProjectType.findOne({ _id: id })

        if (!projectType) return handleError('Project type does not exist', 404)

        return handleResponse('Get project type successfully', projectType)
    } catch (error) {
        console.log(error)
    }
}

const createProjectTypeService = async (data) => {
    try {
        const projectTypeExist = await ProjectType.findOne({ name: { $regex: data.name, $options: 'i' } })

        if (projectTypeExist) return handleError('Project type already exist', 400)

        const projectType = new ProjectType(data)
        const newProjectType = await projectType.save()
        return handleResponse('Create new project type successfully', newProjectType)
    } catch (error) {
        console.log(error)
    }
}

const updateProjectTypeService = async (id, data) => {
    try {
        const projectType = await ProjectType.findOne({ _id: id })

        if (!projectType) return handleError('Project type does not exist', 404)

        const updateProjectType = await ProjectType.updateOne(
            { _id: id },
            {
                $set: data
            }
        )
        return handleResponse('Update project type successfully', updateProjectType)
    } catch (error) {
        console.log(error)
    }
}

const deleteProjectTypeService = async (id) => {
    try {
        const projectType = await ProjectType.findOne({ _id: id })

        if (!projectType) return handleError('Project type does not exist', 404)

        const deleteProjectType = await ProjectType.deleteOne({ _id: id })
        return handleResponse('Remove project type successfully', deleteProjectType)
    } catch (error) {
        console.log(error)
    }
}

export { getAllProjectTypeService, getOneProjectTypeService, createProjectTypeService, updateProjectTypeService, deleteProjectTypeService }