import { expect } from 'chai'
import { stub } from 'sinon'
import Project from '../models/project.model'
import { createProjectService, getAllProjectsService, getOneProjectService } from '../services/project.service'

describe('Project Testing', () => {
  let getAllProjects, getOneProject, createProject

  const dataTest = {
    _id: "123456",
    name: "Project name testing",
    description: "Project description testing"
  }

  beforeEach(() => {
    getAllProjects = stub(Project, 'find')
    getOneProject = stub(Project, 'findOne')
    createProject = stub(Project.prototype, 'save')
  })

  afterEach(() => {
    getAllProjects.restore()
    getOneProject.restore()
    createProject.restore()
  })

  it('Should get all projects successfully', async () => {
    const skipStub = stub().returns({ limit: stub().resolves([]) });
    const sortStub = stub().returns({ skip: skipStub });

   getAllProjects.returns({
     sort: sortStub,
     countDocuments: stub().resolves(0)
   })

   const result = await getAllProjectsService({})
   expect(result.status).equal(200)
   expect(result.data.totalItems).equal(0)
   expect(result.data.projects).to.be.an('array')
  })

  it('Should get one projects successfully', async () => {
    getOneProject.returns({
      populate: stub().resolves(dataTest)
    })

    const result = await getOneProjectService({ _id: dataTest._id })
    expect(result.status).equal(200)
    expect(result.data).to.be.an('object')
  })

  it('Should return fail when create project because name already exists', async () => {
    getOneProject.resolves(dataTest)

    const { name, description } = dataTest
    const result = await createProjectService({ name, description })
    expect(result.status).equal(400)
    expect(result.messageCode).equal('PROJECT_NAME_ALREADY_EXIST')
  })

  it('Should return new project', async () => {
    const { name, description } = dataTest

    createProject.resolves({ name, description })
    const result = await createProjectService({ name, description })
    expect(result.status).equal(200)
    expect(result.data).to.be.an('object')
    expect(result.data).to.have.all.keys('name', 'description')
  })
})