import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import path from 'path'
import morgan from 'morgan'
import cors from 'cors'
import { prisma1, prisma2, prisma3 } from './database/db'
import * as argon2 from 'argon2'

// routes
import departmentRouter from './route/department-route';


// error Middleware
import { errorHandler } from "./middlewares/error-handler";



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
  const hash = await argon2.hash('password')
  const user = await prisma1.user.findMany()
  await prisma1.user.create({
    data: {
      name: 'test421wer11',
      email: 'naphat.d1ew45@gmail.com',
      password: '1234'
    },
  })
  return res.status(200).json({
    data: user,
  })
})
app.get('/customer', async (_: Request, res: Response) => {
  const customer = await prisma2.customer.findMany({
    orderBy: { id: 'desc' },
  })
  const user = await prisma1.user.findMany()
  user.map((val) => {
    return val.email + customer.length
  })
  return res.status(200).json({
    data: customer,
    map: user,
  })
})
app.get('/account', async (_: Request, res: Response) => {
  try {
    // create account
   
    await prisma3.account.create({
      data: {
        name: 'test111',
        email: 'naphat.d111@gmail.com',
      },
    })

    const account = await prisma3.account.findMany({
      orderBy: { id: 'desc' },
    })

    return res.status(200).json({
      data: account,
    })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'เกิดข้อผิดพลาด กรุณาลองใหม่' })
  }
})

// localhost:4000/api/v1/department
app.use("/api/v1/department", departmentRouter);

// error middleware ต้องอยู่บรรทัดสุดท้ายของ user ตัวอื่นๆ เสมอ
app.use(errorHandler);


const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(` 🚀🚀🚀 Server is running at http://localhost:${port}`)
})
