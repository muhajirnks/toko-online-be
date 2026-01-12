import { Request, Response, NextFunction } from "express";
import { AppError } from "@/pkg/apperror/appError";
import { errorResponse, internalErrorResponse, validationErrorResponse } from "@/pkg/response/error";
import { ValidationError } from "yup";

const globalErrorHandler = (error: any, _: Request, res: Response, __: NextFunction) => {
   if (error instanceof ValidationError) {
      const errors: Record<string, string[]> = {};
      error.inner.forEach((err) => {
         if (err.path) {
            errors[err.path] = [err.message];
         }
      });
      return validationErrorResponse(res, "Validation Error", errors);
   }

   if (error instanceof AppError) {
      return errorResponse(res, error.message, error.statusCode);
   }

   console.error("Unhandled Error:", error);
   const requestId = Math.random().toString(36).substring(7);
   return internalErrorResponse(res, "Internal Server Error", requestId);
};

export default globalErrorHandler;
