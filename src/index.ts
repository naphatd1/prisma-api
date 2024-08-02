import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import path from 'path'
import morgan from 'morgan'
import cors from 'cors'
import { prisma1, prisma2 } from './database/mysql'

const app: Express = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json({ limit: '50mb' }))

app.get('/', (_: Request, res: Response) => {
  return res.status(200).json({
    Learn: process.env.COMPANY_NAME,
    message: 'Express Backend API...',
  })
})
app.get('/user', async (_: Request, res: Response) => {
  const user = await prisma1.user.findMany()
  return res.status(200).json({
    data: user,
  })
})
app.get('/customer', async (_: Request, res: Response) => {
  const customer = await prisma2.customer.findMany({
    orderBy: { id: 'desc' },
  })
  return res.status(200).json({
    data: customer,
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(` 🚀🚀🚀 Server is running at http://localhost:${port}`)
})
