import { verifyToken } from "@/modules/auth/auth.service";
import { Request, Response, NextFunction } from "express";
import { AdminSchema } from '@/models/Auth'
import { HydratedDocument } from 'mongoose'

declare global {
    namespace Express {
      interface Request {
        user: HydratedDocument<AdminSchema> | null
      }
    }
  }

const authMiddleware = async (req: Request, res: Response, next: NextFunction)=>{
    const token = req.cookies.token;

    if(token){
        try {
            const user = await verifyToken(token)
            req.user = user
            next()
        } catch (err: any) {
            res.status(401).json({message: err.message});
        }
    } else {
        res.status(401).json({message: 'Unauthorized'});
    }
};

export default authMiddleware;