import {Request, Response, NextFunction} from "express"
import { Prisma } from "../../prisma/generate-client-db2";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const statusCode = err.statusCode || 500;

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          return res.status(statusCode).json({ 
            status_code: statusCode,
            error: err.message, 
            details: err.meta?.target 
          });
        }
    } else {
        return res.status(statusCode).json({ 
            status_code: statusCode,
            error: err.message, 
            details: err.meta?.target 
        });
    }
}