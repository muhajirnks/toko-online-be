import { Request, Response } from "express";
import { createOrderSchema, listOrderSchema, updateOrderStatusSchema } from "./order.validation";
import {
   createOrderService,
   deleteOrderService,
   listOrdersService,
   getOrderByIdService,
   updateOrderStatusService,
} from "./order.service";
import { createdResponse, paginationResponse, successResponse } from "@/pkg/response/success";

export const listOrdersHandler = async (req: Request, res: Response) => {
   const query = await listOrderSchema.validate(req.query)
   const data = await listOrdersService(req.user!, query);
   paginationResponse(res, data);
};

export const getOrderByIdHandler = async (req: Request, res: Response) => {
   const id = req.params.id as string;
   const data = await getOrderByIdService(id, req.user!);
   successResponse(res, { data });
};

export const createOrderHandler = async (req: Request, res: Response) => {
   const body = await createOrderSchema.validate(req.body);
   const data = await createOrderService(req.user!, body);
   createdResponse(res, { data, message: "Order created successfully" });
};

export const updateOrderHandler = async (req: Request, res: Response) => {
   const id = req.params.id as string;
   const body = await updateOrderStatusSchema.validate(req.body);
   const data = await updateOrderStatusService(id, req.user!, body);
   successResponse(res, { data, message: "Order updated successfully" });
};

export const deleteOrderHandler = async (req: Request, res: Response) => {
   const id = req.params.id as string;
   await deleteOrderService(id);
   successResponse(res, { message: "Order deleted successfully" });
};
