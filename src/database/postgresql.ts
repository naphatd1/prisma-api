import { PrismaClient as PrismaClientDb4 } from '../../prisma/generate-client-db4'

const globalForPrismaDb4 = globalThis as unknown as { prisma: PrismaClientDb4 }

export const prisma3 = globalForPrismaDb4.prisma || new PrismaClientDb4({ log: ['info'] })

if (process.env.NODE_ENV !== 'production') globalForPrismaDb4.prisma = prisma3
