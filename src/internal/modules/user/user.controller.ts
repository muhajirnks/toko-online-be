import { Request, Response } from "express";
import {
   deleteUserService,
   listUsersService,
   getUserByIdService,
   updateUserService,
} from "./user.service";
import { paginationResponse, successResponse } from "@/pkg/response/success";
import { updateUserSchema, listUserSchema } from "./user.validation";
import { validateSchema } from "@/pkg/validation/validate";

export const listUsersHandler = async (req: Request, res: Response) => {
   const query = await validateSchema(listUserSchema, req.query);
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
   const body = await validateSchema(updateUserSchema, req.body);
   const data = await updateUserService(id, body);
   successResponse(res, { data, message: "User updated successfully" });
};

export const deleteUserHandler = async (req: Request, res: Response) => {
   const id = req.params.id as string;
   await deleteUserService(id);
   successResponse(res, { message: "User deleted successfully" });
};
