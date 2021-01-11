import server from '../app'
import { expect } from 'chai'
import { loginService } from '../services/auth.service'

describe('Auth testing', () => {
  afterEach(() => {
    server.close()
  })

  it('Should login successfully', async () => {
    const acc = { email: 'anhpn@gmail.com', password: 'huytay95' }
    const result = await loginService(acc)
    expect(result.status).equal(200)
    expect(result.data).to.include.all.keys('accessToken', 'refreshToken')
  })

  it('Email does not exist', async () => {
    const acc = { email: 'anhpn@gmail.com1' }
    const result = await loginService(acc)
    expect(result.status).equal(404)
  })

  it('Password is incorrect', async () => {
    const acc = { email: 'anhpn@gmail.com', password: 'huytay9511' }
    const result = await loginService(acc)
    expect(result.status).equal(400)
  })
})
