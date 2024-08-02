import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import path from 'path'
import morgan from 'morgan'
import cors from 'cors'
import { prisma } from './database/mysql'

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
  const user = await prisma.user.findMany()
  return res.status(200).json({
    data: user,
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(` 🚀🚀🚀 Server is running at http://localhost:${port}`)
})
