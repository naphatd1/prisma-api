import { Prisma } from '../../prisma/generate-client-db2'
import { prisma1 } from '../database/db'

export async function findAllDepartment() {
  return await prisma1.department.findMany({
    orderBy: { department_id: 'desc' },
  })
}

export async function findAllDepartmentWithPagination(
  page: number = 1,
  pageSize: number = 3
) {
  return await prisma1.department.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { department_id: 'desc' },
  })
}

export async function findTotalRecordDepartment() {
  return await prisma1.department.count()
}

export async function findByIdDepartment(id: string) {
  return await prisma1.department.findUnique({
    select: { department_id: true },
    where: { department_id: id },
  })
}

export async function createDepartment(data: Prisma.DepartmentCreateInput) {
  return await prisma1.department.create({
    data: data,
  })
}

export async function removeDepartment(id: string) {
  return await prisma1.department.delete({
    where: { department_id: id },
  })
}

export async function updateDepartment(
  id: string,
  data: Prisma.DepartmentUpdateInput
) {
  return await prisma1.department.update({
    data: data,
    where: { department_id: id },
  })
}

//ค้นหาด้วยชื่อ
export async function searchDepartment(name: string) {
  return await prisma1.department.findMany({
    where: {
      department_name: { contains: `${name}` },
    },
  })
}

// raw sql
export async function findAllDepartmentRaw() {
  return await prisma1.$queryRaw`select * from Department order by department_id desc`
}

// call store procudure (sql server)
// await prisma.$executeRaw`EXEC ชื่อ`
