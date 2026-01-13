import { Request, Response } from "express";
import {
   createCategorySchema,
   listCategorySchema,
   updateCategorySchema,
} from "./category.validation";
import {
   createCategoryService,
   deleteCategoryService,
   listCategoriesService,
   getCategoryByIdService,
   updateCategoryService,
} from "./category.service";
import {
   createdResponse,
   paginationResponse,
   successResponse,
} from "@/pkg/response/success";

export const listCategoriesHandler = async (req: Request, res: Response) => {
   const query = await listCategorySchema.validate(req.query);
   const data = await listCategoriesService(query);
   paginationResponse(res, data);
};

export const getCategoryByIdHandler = async (req: Request, res: Response) => {
   const id = req.params.id as string;
   const data = await getCategoryByIdService(id);
   successResponse(res, { data });
};

export const createCategoryHandler = async (req: Request, res: Response) => {
   const body = await createCategorySchema.validate(req.body);
   const data = await createCategoryService(body);
   createdResponse(res, { data, message: "Category created successfully" });
};

export const updateCategoryHandler = async (req: Request, res: Response) => {
   const id = req.params.id as string;
   const body = await updateCategorySchema.validate(req.body);
   const data = await updateCategoryService(id, body);
   successResponse(res, { data, message: "Category updated successfully" });
};

export const deleteCategoryHandler = async (req: Request, res: Response) => {
   const id = req.params.id as string;
   await deleteCategoryService(id);
   successResponse(res, { message: "Category deleted successfully" });
};
