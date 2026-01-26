import { Request, Response } from "express";
import {
   createMyStoreService,
   getMyStoreService,
   updateMyStoreService,
} from "./store.service";
import { createdResponse, successResponse } from "@/pkg/response/success";
import { createStoreSchema, updateStoreSchema } from "./store.validation";

export const getMyStore = async (req: Request, res: Response) => {
   const result = await getMyStoreService(req.user!.id);
   successResponse(res, { data: result });
};

export const createMyStore = async (req: Request, res: Response) => {
   const body = await createStoreSchema.validate(req.body);
   const result = await createMyStoreService(req.user!.id, body);
   createdResponse(res, { data: result, message: "Store created successfully" });
};

export const updateMyStore = async (req: Request, res: Response) => {
   const body = await updateStoreSchema.validate(req.body);
   const result = await updateMyStoreService(req.user!.id, body);
   successResponse(res, { data: result, message: "Store updated successfully" });
};
