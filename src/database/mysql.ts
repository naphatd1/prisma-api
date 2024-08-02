import { PrismaClient as PrismaClientDb1 } from '../../prisma/generate-client-db2'
import { PrismaClient as PrismaClientDb2 } from '../../prisma/generate-client-db3'
// export const prisma = new PrismaClient()

const globalForPrismaDb1 = globalThis as unknown as { prisma: PrismaClientDb1 }
const globalForPrismaDb2 = globalThis as unknown as { prisma: PrismaClientDb2 }

export const prisma1 = globalForPrismaDb1.prisma || new PrismaClientDb1({
    log: ['info']
})
export const prisma2 = globalForPrismaDb2.prisma || new PrismaClientDb2({
    log: ['info']
})

if (process.env.NODE_ENV !== 'production') globalForPrismaDb1.prisma = prisma1
if (process.env.NODE_ENV !== 'production') globalForPrismaDb2.prisma = prisma2
