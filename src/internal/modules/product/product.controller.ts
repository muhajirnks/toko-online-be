import { Request, Response } from "express";
import { createProductSchema, updateProductSchema } from "./product.validation";
import {
   createProductService,
   deleteProductService,
   getAllProductsService,
   getProductByIdService,
   updateProductService,
} from "./product.service";
import { createdResponse, successResponse } from "@/pkg/response/success";

export const getAllProductsHandler = async (req: Request, res: Response) => {
   const data = await getAllProductsService();
   successResponse(res, { data });
};

export const getProductByIdHandler = async (req: Request, res: Response) => {
   const id = req.params.id as string;
   const data = await getProductByIdService(id);
   successResponse(res, { data });
};

export const createProductHandler = async (req: Request, res: Response) => {
   const body = await createProductSchema.validate(req.body);
   const data = await createProductService(
      {
         ...body,
         sellerId: req.user!.id,
      } as any,
      req.file
   );
   createdResponse(res, { data, message: "Product created successfully" });
};

export const updateProductHandler = async (req: Request, res: Response) => {
   const id = req.params.id as string;
   const body = await updateProductSchema.validate(req.body);
   const data = await updateProductService(id, body as any, req.user!.id, req.file);
   successResponse(res, { data, message: "Product updated successfully" });
};

export const deleteProductHandler = async (req: Request, res: Response) => {
   const id = req.params.id as string;
   await deleteProductService(id, req.user!.id);
   successResponse(res, { message: "Product deleted successfully" });
};
