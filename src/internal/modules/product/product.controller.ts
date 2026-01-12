import { Request, Response } from "express";
import { createProductSchema, listProductSchema, updateProductSchema } from "./product.validation";
import {
   createProductService,
   deleteProductService,
   listProductsService,
   getProductByIdService,
   updateProductService,
} from "./product.service";
import { createdResponse, successResponse } from "@/pkg/response/success";

export const listProductsHandler = async (req: Request, res: Response) => {
   const query = await listProductSchema.validate(req.query);
   const data = await listProductsService(query);
   successResponse(res, { data });
};

export const getProductByIdHandler = async (req: Request, res: Response) => {
   const id = req.params.id as string;
   const data = await getProductByIdService(id);
   successResponse(res, { data });
};

export const createProductHandler = async (req: Request, res: Response) => {
   req.body.image = req.file;
   const body = await createProductSchema.validate(req.body);
   const data = await createProductService(body, req.user!);
   createdResponse(res, { data, message: "Product created successfully" });
};

export const updateProductHandler = async (req: Request, res: Response) => {
   const id = req.params.id as string;
   req.body.image = req.file;
   const body = await updateProductSchema.validate(req.body);
   const data = await updateProductService(id, body, req.user!);
   successResponse(res, { data, message: "Product updated successfully" });
};

export const deleteProductHandler = async (req: Request, res: Response) => {
   const id = req.params.id as string;
   await deleteProductService(id, req.user!.id);
   successResponse(res, { message: "Product deleted successfully" });
};
