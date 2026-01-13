import { Request, Response } from "express";
import {
   deleteUserService,
   listUsersService,
   getUserByIdService,
   updateUserService,
} from "./user.service";
import { paginationResponse, successResponse } from "@/pkg/response/success";
import { updateUserSchema, listUserSchema } from "./user.validation";

export const listUsersHandler = async (req: Request, res: Response) => {
   const query = await listUserSchema.validate(req.query);
   const data = await listUsersService(query);
   paginationResponse(res, data);
};

export const getUserByIdHandler = async (req: Request, res: Response) => {
   const id = req.params.id as string;
   const data = await getUserByIdService(id);
   successResponse(res, { data });
};

export const updateUserHandler = async (req: Request, res: Response) => {
   const id = req.params.id as string;
   const body = await updateUserSchema.validate(req.body);
   const data = await updateUserService(id, body);
   successResponse(res, { data, message: "User updated successfully" });
};

export const deleteUserHandler = async (req: Request, res: Response) => {
   const id = req.params.id as string;
   await deleteUserService(id);
   successResponse(res, { message: "User deleted successfully" });
};
