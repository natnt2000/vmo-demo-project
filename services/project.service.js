import Project from '../models/project.model'
import ProjectType from '../models/projectType.model'
import ProjectStatus from '../models/projectStatus.model'
import Department from '../models/department.model'
import TechStack from '../models/techStack.model'
import Staff from '../models/staff.model'

import { handleError, handleResponse } from '../helpers/response.helper'

const getAllProjectsService = async () => {
    try {
        const projects = await Project.find()
        return handleResponse('Get projects successfully', projects)
    } catch (error) {
        console.log(error)
    }
}

const getOneProjectService = async id => {
    try {
        const populate = [
            { path: 'projectType', select: 'name' },
            { path: 'projectStatus', select: 'name' },
            { path: 'techStack', select: 'name' },
            { path: 'department', select: 'name' },
            { path: 'staffs', select: 'fullName' }
        ]
        const project = await Project.findOne({ _id: id }).populate(populate)

        if (!project) return handleError('Project does not exist', 404)

        return handleResponse('Get project successfully', project)
    } catch (error) {
        console.log(error)
    }
}

const createProjectService = async data => {
    try {
        const projectExist = await Project.findOne({ name: { $regex: data.name, $options: 'i' } })

        if (projectExist) return handleError('Project name already exist', 400)

        const checkRequest = await verifyProjectRequest(data)

        if (checkRequest) return checkRequest

        const project = new Project(data)
        const checkDates = project.checkDates(data.startDate, data.endDate)

        if (!checkDates) return handleError('Start date must be less than end date', 400)

        const newProject = await project.save()
        return handleResponse('Create project successfully', newProject)
    } catch (error) {
        console.log(error)
    }
}

const updateProjectService = async (id, data) => {
    try {
        const project = await Project.findOne({ _id: id })
        const { name, startDate, endDate } = data

        if (!project) return handleError('Project does not exist', 404)

        if (name) {
            const projectExist = await Project.findOne({ name: { $regex: name, $options: 'i' } })

            if (projectExist && project.name !== name) return handleError('Project name already exist', 400)
        }

        if (startDate) {
            if (!project.checkDates(startDate, project.endDate)) return handleError('Start date must be less than end date', 400)
        }

        if (endDate) {
            if (!project.checkDates(project.startDate, endDate)) return handleError('End date must be greater than start date', 400)
        }

        if (startDate && endDate) {
            if (!project.checkDates(startDate, endDate)) return handleError('Start date must be less than end date', 400)
        }

        const checkRequest = await verifyProjectRequest(data)

        if (checkRequest) return checkRequest

        const updateProject = await Project.updateOne({ _id: id }, { $set: data })
        return handleResponse('Update project successfully', updateProject)
    } catch (error) {
        console.log(error)
    }
}

const deleteProjectService = async id => {
    try {
        const project = await Project.findOne({ _id: id })

        if (!project) return handleError('Project does not exist', 404)

        const deleteProject = await Project.deleteOne({ _id: id })
        return handleResponse('Delete project successfully', deleteProject)
    } catch (error) {
        console.log(error)
    }
}

const verifyProjectRequest = async data => {
    try {
        const { projectType, projectStatus, techStack, department, staffs } = data

        if (projectType) {
            const projectTypeExist = await ProjectType.findOne({ _id: projectType })

            if (!projectTypeExist) return handleError('Project type does not exist', 404)
        }

        if (projectStatus) {
            const projectStatusExist = await ProjectStatus.findOne({ _id: projectStatus })

            if (!projectStatusExist) return handleError('Project status does not exist', 404)
        }

        if (techStack) {
            const techStackExist = await TechStack.findOne({ _id: techStack })

            if (!techStackExist) return handleError('Tech stack does not exist', 404)
        }

        if (department) {
            const departmentExist = await Department.findOne({ _id: department })

            if (!departmentExist) return handleError('Department does not exist', 404)
        }

        if (staffs && staffs.length > 0) {
            const staffsExist = await Staff.find({ _id: { $in: staffs } })

            if (staffsExist.length !== staffs.length) return handleError('Staffs list incorrect', 400)
        }
    } catch (error) {
        console.log(error)
    }
}

export { getAllProjectsService, getOneProjectService, createProjectService, updateProjectService, deleteProjectService }