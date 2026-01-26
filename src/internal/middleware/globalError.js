"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = require("../../pkg/apperror/appError");
const error_1 = require("../../pkg/response/error");
const yup_1 = require("yup");
const globalErrorHandler = (error, _, res, __) => {
    if (error instanceof yup_1.ValidationError) {
        const errors = {};
        error.inner.forEach((err) => {
            if (err.path) {
                errors[err.path] = [err.message];
            }
        });
        return (0, error_1.validationErrorResponse)(res, "Validation Error", errors);
    }
    if (error instanceof appError_1.AppError) {
        return (0, error_1.errorResponse)(res, error.message, error.statusCode);
    }
    console.error("Unhandled Error:", error);
    const requestId = Math.random().toString(36).substring(7);
    return (0, error_1.internalErrorResponse)(res, "Internal Server Error", requestId);
};
exports.default = globalErrorHandler;
