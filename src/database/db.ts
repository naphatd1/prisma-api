import { PrismaClient as PrismaClientDb1 } from '../../prisma/generate-client-db2'
import { PrismaClient as PrismaClientDb2 } from '../../prisma/generate-client-db3'
import { PrismaClient as PrismaClientDb3 } from '../../prisma/generate-client-db4'

// export const prisma = new PrismaClient()

const globalForPrismaDb1 = globalThis as unknown as { prisma: PrismaClientDb1 }
const globalForPrismaDb2 = globalThis as unknown as { prisma: PrismaClientDb2 }
const globalForPrismaDb3 = globalThis as unknown as { prisma: PrismaClientDb3 }

//mysql
export const prisma1 = globalForPrismaDb1.prisma || new PrismaClientDb1({
    log: ['info']
})
export const prisma2 = globalForPrismaDb2.prisma || new PrismaClientDb2({
    log: ['info']
})
//postgresql
export const prisma3 = globalForPrismaDb3.prisma || new PrismaClientDb3({
    log: ['info']
})

if (process.env.NODE_ENV !== 'production') globalForPrismaDb1.prisma = prisma1
if (process.env.NODE_ENV !== 'production') globalForPrismaDb2.prisma = prisma2
if (process.env.NODE_ENV !== 'production') globalForPrismaDb3.prisma = prisma3
