import { Request, Response } from "express";
import { createOrderSchema, updateOrderStatusSchema } from "./order.validation";
import {
   createOrderService,
   getAllOrdersService,
   getOrderByIdService,
   updateOrderStatusService,
} from "./order.service";
import { createdResponse, successResponse } from "@/pkg/response/success";

export const getAllOrdersHandler = async (req: Request, res: Response) => {
   const data = await getAllOrdersService();
   successResponse(res, { data });
};

export const getOrderByIdHandler = async (req: Request, res: Response) => {
   const id = req.params.id as string;
   const data = await getOrderByIdService(id);
   successResponse(res, { data });
};

export const createOrderHandler = async (req: Request, res: Response) => {
   const body = await createOrderSchema.validate(req.body);
   // If user is logged in, attach userId
   const userId = req.user?.id;
   const data = await createOrderService({ ...body, userId });
   createdResponse(res, { data, message: "Order placed successfully" });
};

export const updateOrderStatusHandler = async (req: Request, res: Response) => {
   const id = req.params.id as string;
   const { status } = await updateOrderStatusSchema.validate(req.body);
   const data = await updateOrderStatusService(id, status);
   successResponse(res, { data, message: "Order status updated successfully" });
};
