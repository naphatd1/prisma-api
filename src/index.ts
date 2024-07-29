import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import path from 'path'
import morgan from 'morgan'
import cors from 'cors'

const app: Express = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json({ limit: '50mb' }))

app.use('/', (_: Request, res: Response) => {
  res.status(200).json({
    Learn: process.env.COMPANY_NAME,
    message: 'Express Backend API...',
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(` 🚀🚀🚀 Server is running at http://localhost:${port}`)
})
