import { expect } from 'chai'
import { stub } from 'sinon'
import ProjectStatus from '../models/projectStatus.model'
import {
  getAllProjectStatusesService,
  createProjectStatusService,
  getOneProjectStatusService,
} from '../services/projectStatus.service'

describe('Project status testing', () => {
  let getAllProjectStatuses, createProjectStatus, getOneProjectStatus

  beforeEach(() => {
    getAllProjectStatuses = stub(ProjectStatus, 'find')
    createProjectStatus = stub(ProjectStatus.prototype, 'save')
    getOneProjectStatus = stub(ProjectStatus, 'findOne')
  })

  afterEach(() => {
    getAllProjectStatuses.restore()
    createProjectStatus.restore()
    getOneProjectStatus.restore()
  })

  it('Get all project statuses successfully', async () => {
    getAllProjectStatuses.resolves([])
    const result = await getAllProjectStatusesService()
    expect(result.status).equal(200)
    expect(result.data).to.be.an('array')
  })

  it('Get one project status successfully', async () => {
    const data = {
      id: '554433',
      name: 'Test 123',
      description: 'Description 123',
    }
    getOneProjectStatus.resolves(data)
    const result = await getOneProjectStatusService({ _id: data.id })
    expect(result.status).equal(200)
    expect(result.data.name).equal(data.name)
    expect(result.data.description).equal(data.description)
  })

  it('Create project status failed because name already exist', async () => {
    const data = {
      name: 'Test 123',
      description: 'Description 123',
    }

    getOneProjectStatus.resolves(data)
    const result = await createProjectStatusService(data)
    expect(result.status).equal(400)
  })

  it('Create project status successfully', async () => {
    const data = {
      name: 'Test 123',
      description: 'Description 123',
    }

    createProjectStatus.resolves(data)
    const result = await createProjectStatusService(data)
    expect(result.status).equal(200)
    expect(result.message).equal('Create new project status successfully')
  })
})
