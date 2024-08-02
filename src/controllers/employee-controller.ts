import { Request, Response } from "express";
import { prisma1 } from "../database/db";

// localhost:4000/api/v1/employee
export async function index(req: Request, res: Response) {
  // const emp = await prisma.employee.findMany();

  // many to one
  // const emp = await prisma.employee.findMany({
  //   include: { // all fields
  //     Department: true,
  //   }
  // });
  // const emp = await prisma.employee.findMany({
  //   select: {
  //     emp_no: true,
  //     gender: true,
  //     Department: {
  //       select: {
  //         department_name: true
  //       }
  //     }
  //   },
  // });

  // one to one
  const emp = await prisma1.employee.findMany({
    include: {
      Department: true, // many to one
      User: true, // one to one
    }
  });

  return res.status(200).json(emp);
}
