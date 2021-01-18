import { expect } from 'chai'
import { stub } from 'sinon'
import Department from '../models/department.model'
import {
  getAllDepartmentsService,
  createDepartmentService,
  getOneDepartmentService,
} from '../services/department.service'

describe('Department testing', () => {
  let getAllDepartments, createDepartment, getOneDepartment

  beforeEach(() => {
    getAllDepartments = stub(Department, 'find')
    createDepartment = stub(Department.prototype, 'save')
    getOneDepartment = stub(Department, 'findOne')
  })

  afterEach(() => {
    getAllDepartments.restore()
    createDepartment.restore()
    getOneDepartment.restore()
  })

  it('Get all departments successfully', async () => {
    getAllDepartments.resolves([])
    const result = await getAllDepartmentsService()
    expect(result.status).equal(200)
    expect(result.data).to.be.an('array')
  })

  it('Get one department successfully', async () => {
    const data = {
      id: '123',
      name: 'Test 123',
      description: 'Description 123',
      techStacks: [{
        _id: '5feaeec5551ad72e802f58dc',
        name: 'techStack test'
      }]
    }

    getOneDepartment.returns({
      populate: stub().resolves(data)
    })

    const result = await getOneDepartmentService({ _id: data.id })
    expect(result.status).equal(200)
    expect(result.data.techStacks).to.be.an('array')
  })

  it('Create department failed because name already exist', async () => {
    const data = {
      name: 'Test 123',
      description: 'Description 123',
      techStacks: ['5feaeec5551ad72e802f58dc']
    }

    getOneDepartment.resolves(data)
    const result = await createDepartmentService(data)
    expect(result.status).equal(400)
  })

  it('Create department successfully', async () => {
    const data = {
      name: 'Test 123',
      description: 'Description 123',
      techStacks: ['5feaeec5551ad72e802f58dc'],
    }

    createDepartment.resolves(data)
    const result = await createDepartmentService(data)
    expect(result.status).equal(200)
    expect(result.data.techStacks).to.be.an('array')
  })
})
