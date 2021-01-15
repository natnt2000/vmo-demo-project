import { expect } from 'chai'
import { stub } from 'sinon'
import Staff from '../models/staff.model'
import { createStaffService, getAllStaffsService, getOneStaffService } from '../services/staff.service'

describe('Staff testing', () => {
  let getAllStaffs, getOneStaff, createStaff

  const dataTest = {
    _id: "123456",
    fullName: "Pham Ngoc Anh",
    birthday: "2000-08-30",
    phone: "0123456789"
  }

  beforeEach(() => {
    getAllStaffs = stub(Staff, 'find')
    getOneStaff = stub(Staff, 'findOne')
    createStaff = stub(Staff.prototype, 'save')
  })

  afterEach(() => {
    getAllStaffs.restore()
    getOneStaff.restore()
    createStaff.restore()
  })

  it('Should get all staffs successfully', async () => {
    const skipStub = stub().returns({ limit: stub().resolves([]) });
    const sortStub = stub().returns({ skip: skipStub });

    getAllStaffs.returns({
      sort: sortStub,
      countDocuments: stub().resolves(0)
    })

    const result = await getAllStaffsService({})
    expect(result.data.totalItems).equal(0)
    expect(result.data.staffs).to.be.an('array')
  })

  it('Should get one staff successfully', async () => {
    getOneStaff.returns({
      populate: stub().resolves(dataTest)
    })

    const result = await getOneStaffService({ _id: dataTest._id })
    expect(result.status).equal(200)
    expect(result.data).to.be.an('object')
  })

  it('Should get one staff failed', async () => {
    getOneStaff.returns({
      populate: stub().resolves(undefined)
    })

    const result = await getOneStaffService({ _id: dataTest._id })
    expect(result.status).equal(404)
  })

  it('Should create staff failed because phone already exists', async () => {
    getOneStaff.resolves(dataTest)

    const { fullName, birthday, phone } = dataTest
    const result = await createStaffService({ fullName, birthday, phone })
    expect(result.status).equal(400)
  })

  it('Should create staff successfully', async () => {
    const { fullName, birthday, phone } = dataTest

    createStaff.resolves({ fullName, birthday, phone } )
    const result = await createStaffService({ fullName, birthday, phone })
    expect(result.status).equal(200)
    expect(result.data).to.be.an('object')
    expect(result.data).to.have.all.keys('fullName', 'birthday', 'phone')
  })
})