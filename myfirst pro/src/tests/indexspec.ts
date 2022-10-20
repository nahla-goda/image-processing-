import supertest from 'supertest'
import app from '../app'

const request = supertest(app)

describe('test end point', () => {
  it('checks end point reponse', async () => {
    const response = await request.get('/api')
    expect(response.status).toBe(200)
  })
})
