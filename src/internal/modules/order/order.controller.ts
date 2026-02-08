import { Request, Response } from "express";
import {
   createOrderSchema,
   listBuyerOrderSchema,
   listSellerOrderSchema,
   updateOrderStatusSchema,
} from "./order.validation";
import {
   createOrderService,
   deleteOrderService,
   listBuyerOrdersService,
   listSellerOrdersService,
   getOrderByIdService,
   updateOrderStatusService,
} from "./order.service";
import {
   createdResponse,
   paginationResponse,
   successResponse,
} from "@/pkg/response/success";
import { validateSchema } from "@/pkg/validation/validate";

export const listBuyerOrdersHandler = async (req: Request, res: Response) => {
   const query = await validateSchema(listBuyerOrderSchema, req.query);
   const data = await listBuyerOrdersService(req.user!, query);
   paginationResponse(res, data);
};

export const listSellerOrdersHandler = async (req: Request, res: Response) => {
   const query = await validateSchema(listSellerOrderSchema, req.query);
   const data = await listSellerOrdersService(req.user!, query);
   paginationResponse(res, data);
};

export const getOrderByIdHandler = async (req: Request, res: Response) => {
   const id = req.params.id as string;
   const data = await getOrderByIdService(id, req.user!);
   successResponse(res, { data });
};

export const createOrderHandler = async (req: Request, res: Response) => {
   const body = await validateSchema(createOrderSchema, req.body);
   const data = await createOrderService(req.user!, body);
   createdResponse(res, { data, message: "Order created successfully" });
};

export const updateOrderHandler = async (req: Request, res: Response) => {
   const id = req.params.id as string;
   const body = await validateSchema(updateOrderStatusSchema, req.body);
   const data = await updateOrderStatusService(id, req.user!, body);
   successResponse(res, { data, message: "Order updated successfully" });
};

export const deleteOrderHandler = async (req: Request, res: Response) => {
   const id = req.params.id as string;
   await deleteOrderService(id);
   successResponse(res, { message: "Order deleted successfully" });
};
