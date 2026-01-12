import { Request, Response } from "express";
import {
   deleteUserService,
   getAllUsersService,
   getUserByIdService,
   updateUserService,
} from "./user.service";
import { successResponse } from "@/pkg/response/success";

export const getAllUsersHandler = async (req: Request, res: Response) => {
   const data = await getAllUsersService();
   successResponse(res, { data });
};

export const getUserByIdHandler = async (req: Request, res: Response) => {
   const id = req.params.id as string;
   const data = await getUserByIdService(id);
   successResponse(res, { data });
};

export const updateUserHandler = async (req: Request, res: Response) => {
   const id = req.params.id as string;
   const data = await updateUserService(id, req.body);
   successResponse(res, { data, message: "User updated successfully" });
};

export const deleteUserHandler = async (req: Request, res: Response) => {
   const id = req.params.id as string;
   await deleteUserService(id);
   successResponse(res, { message: "User deleted successfully" });
};
