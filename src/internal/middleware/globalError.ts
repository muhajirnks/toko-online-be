import { Request, Response, NextFunction } from "express";
import { AppError } from "@/pkg/apperror/appError";
import { errorResponse, internalErrorResponse, validationErrorResponse } from "@/pkg/response/error";
import { ValidationError } from "yup";

const globalErrorHandler = () => {
   return (_: Request, res: Response, next: NextFunction) => {
      try {
         next();
      } catch (error: any) {
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
            if (error.statusCode <= 500) {
               return errorResponse(res, error.message, error.statusCode);
            }
         }
         // For unknown errors, treat as Internal Server Error
         console.error("Unhandled Error:", error);

         // generate a simple request id or just use a placeholder
         const requestId = Math.random().toString(36).substring(7);
         return internalErrorResponse(res, "Internal Server Error", requestId);
      }
   };
};

export default globalErrorHandler;
