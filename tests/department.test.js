import { expect } from 'chai'
import { stub } from 'sinon'
import Department from '../models/department.model'
import TechStack from '../models/techStack.model'
import { getAllDepartmentsService, createDepartmentService } from '../services/department.service'

describe('Department testing', () => {
    let getAllDepartments, createDepartment, getOneDepartment, getAllTechStacks

    beforeEach(() => {
        getAllDepartments = stub(Department, 'find')
        createDepartment = stub(Department.prototype, 'save')
        getOneDepartment = stub(Department, 'findOne')
        getAllTechStacks = stub(TechStack, 'find')
    })

    afterEach(() => {
        getAllDepartments.restore()
        createDepartment.restore()
        getOneDepartment.restore()
        getAllTechStacks.restore()
    })

    it('Get all departments successfully', async () => {
        getAllDepartments.resolves([])
        const result = await getAllDepartmentsService()
        expect(result.status).equal(200)
        expect(result.data).to.be.an('array')
    })

    it('Create department failed because name already exist', async () => {
        const data = {
            name: "Test 123",
            description: "Description 123"
        }

        getOneDepartment.resolves(data)
        const result = await createDepartmentService(data)
        expect(result.status).equal(400)
    })

    it('Create department successfully', async () => {
        const data = {
            name: "Test 123",
            description: "Description 123",
            techStacks: ['5feaee81551ad72e802f58d8']
        }

        getAllTechStacks.resolves([{_id: data.techStacks[0]}])

        createDepartment.resolves(data)
        const result = await createDepartmentService(data)
        console.log(result)
        expect(result.status).equal(200)
        expect(result.data.techStacks).to.be.an('array')
    })
})