import express, { Request, Response } from 'express'

import routes from './routes/route'

const app = express()
const port = 9090

// set end point
app.get('/', (req: Request, res: Response) => {
  res.send('hello ')
})

app.listen(port, () => {
  console.log('server running on http://localhost:9090')
})
app.use('/api', routes)

export default app
