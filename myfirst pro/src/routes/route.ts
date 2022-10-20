import express, { Request, Response } from 'express'

import param from './api/paramters'

const routes = express.Router()

routes.get('/', (req: Request, res: Response) => {
  res.send('my first project')
})

routes.use('/images', param)
export default routes
