import { handleError } from '../helpers/response.helper'
import {
  createProjectService,
  deleteProjectService,
  getAllProjectsService,
  getOneProjectService,
  updateProjectService,
} from '../services/project.service'
import { getOneProjectStatusService } from '../services/projectStatus.service'
import { getOneProjectTypeService } from '../services/projectType.service'
import { getOneTechStackService } from '../services/techStack.service'
import { getOneDepartmentService } from '../services/department.service'
import { getStaffLengthService } from '../services/staff.service'
const getAllProjects = async (req, res) => {
  try {
    const data = await getAllProjectsService(req.query)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const getOneProject = async (req, res) => {
  try {
    const data = await getOneProjectService(req.params.id)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const createProject = async (req, res) => {
  try {
    const { projectType, projectStatus, techStack, department, staffs } = req.body

    if (projectType) {
      const projectTypeExist = await getOneProjectTypeService(projectType)

      if (projectTypeExist.status === 404) return res.status(projectTypeExist.status).json(projectTypeExist)
    }

    if (projectStatus) {
      const projectStatusExist = await getOneProjectStatusService(projectStatus)

      if (projectStatusExist.status === 404) return res.status(projectStatusExist.status).json(projectStatusExist)
    }

    if (techStack) {
      const techStackExist = await getOneTechStackService(techStack)

      if (techStackExist.status === 404) return res.status(techStackExist.status).json(techStackExist)
    }

    if (department) {
      const departmentExist = await getOneDepartmentService(department)

      if (departmentExist.status === 404) return res.status(departmentExist.status).json(departmentExist)
    }

    if (staffs) {
      const staffLength = await getStaffLengthService({ _id: { $in: staffs } })

      if (staffLength.data !== staffs.length) return res.status(400).json(handleError('Staffs list incorrect', 400))
    }

    const data = await createProjectService(req.body)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const updateProject = async (req, res) => {
  try {
    const { projectType, projectStatus, techStack, department, staffs } = req.body
    
    if (projectType) {
      const projectTypeExist = await getOneProjectTypeService(projectType)

      if (projectTypeExist.status === 404) return res.status(projectTypeExist.status).json(projectTypeExist)
    }

    if (projectStatus) {
      const projectStatusExist = await getOneProjectStatusService(projectStatus)

      if (projectStatusExist.status === 404) return res.status(projectStatusExist.status).json(projectStatusExist)
    }

    if (techStack) {
      const techStackExist = await getOneTechStackService(techStack)

      if (techStackExist.status === 404) return res.status(techStackExist.status).json(techStackExist)
    }

    if (department) {
      const departmentExist = await getOneDepartmentService(department)

      if (departmentExist.status === 404) return res.status(departmentExist.status).json(departmentExist)
    }

    if (staffs) {
      const staffLength = await getStaffLengthService({ _id: { $in: staffs } })

      if (staffLength.data !== staffs.length) return res.status(400).json(handleError('Staffs list incorrect', 400))
    }

    const data = await updateProjectService(req.params.id, req.body)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

const deleteProject = async (req, res) => {
  try {
    const data = await deleteProjectService(req.params.id)
    return res.status(data.status).json(data)
  } catch (error) {
    return res.status(500).json(handleError(error.message, 500))
  }
}

export {
  getAllProjects,
  getOneProject,
  createProject,
  updateProject,
  deleteProject,
}
