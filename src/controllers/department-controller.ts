import { NextFunction, Request, Response } from "express";
import {
  createDepartment,
  findAllDepartmentWithPagination,
  findByIdDepartment,
  findTotalRecordDepartment,
  removeDepartment,
  searchDepartment,
  updateDepartment,
} from "../services/department-service";
import { Prisma } from "../../prisma/generate-client-db2";

// localhost:3000/api/v1/department?page=1&pageSize=3
export async function index(req: Request, res: Response) {
  const {page, pageSize} = req.query;
  const department = await findAllDepartmentWithPagination(Number(page), Number(pageSize));
  const totalRecord = await findTotalRecordDepartment();
  return res.status(200).json({
    total_record: totalRecord,
    data: department,
  });
}

export async function create(req: Request, res: Response) {
  const jsonBody = req.body as Prisma.DepartmentCreateInput;
  console.log(jsonBody);
  const DepartmentNewRecord = await createDepartment(jsonBody);
  return res.status(201).json({
    message: "เพิ่มข้อมูลสำเร็จ",
    data: DepartmentNewRecord,
  });
}
// localhost:3000/api/v1/36
export async function show(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const department = await findByIdDepartment(id);
    if (!department) {
      const error: any = Error("ไม่พบข้อมูล");
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json(department);
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response) {
  const { id } = req.params;
  const department = await findByIdDepartment(id);
  if (!department) {
    return res.status(404).json({ message: "ไม่พบข้อมูลนี้" });
  }

  const jsonBody = req.body as Prisma.DepartmentUpdateInput;
  const updatedDepartment = await updateDepartment(id, jsonBody);

  return res
    .status(200)
    .json({ message: "แก้ไขข้อมูลสำเร็จ", data: updatedDepartment });
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const department = await findByIdDepartment(id);
    if (!department) {
      return res.status(404).json({ message: "ไม่พบข้อมูลนี้" });
    }
    await removeDepartment(id);
    return res.status(200).json({ message: "ลบข้อมูลสำเร็จ" });
  } catch (error) {
    next(error);
  }
}

export async function search(req: Request, res: Response) {
  const { name } = req.query as any;
  const result = await searchDepartment(name);
  // custom model method
  // const result = await prisma1.department.searchDepartmentByName(name);
  if (result.length == 0) {
    return res.status(404).json({ message: "ไม่พบข้อมูลนี้" });
  }
  return res.status(200).json(result);
}
