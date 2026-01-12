import { Request, Response } from "express";
import { createOrderSchema, updateOrderStatusSchema } from "./order.validation";
import {
   createOrderService,
   deleteOrderService,
   getAllOrdersService,
   getOrderByIdService,
   updateOrderService,
} from "./order.service";
import { createdResponse, successResponse } from "@/pkg/response/success";

export const getAllOrdersHandler = async (req: Request, res: Response) => {
   const data = await getAllOrdersService(req.user);
   successResponse(res, { data });
};

export const getOrderByIdHandler = async (req: Request, res: Response) => {
   const id = req.params.id as string;
   const data = await getOrderByIdService(id, req.user);
   successResponse(res, { data });
};

export const createOrderHandler = async (req: Request, res: Response) => {
   const body = await createOrderSchema.validate(req.body);
   const data = await createOrderService({
      ...body,
      userId: (req.user as any)?._id,
   });
   createdResponse(res, { data, message: "Order created successfully" });
};

export const updateOrderHandler = async (req: Request, res: Response) => {
   const id = req.params.id as string;
   const data = await updateOrderService(id, req.body);
   successResponse(res, { data, message: "Order updated successfully" });
};

export const deleteOrderHandler = async (req: Request, res: Response) => {
   const id = req.params.id as string;
   await deleteOrderService(id);
   successResponse(res, { message: "Order deleted successfully" });
};
