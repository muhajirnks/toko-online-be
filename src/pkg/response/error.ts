import { Response } from "express";
import { Decamelized, decamelizeKeys } from "humps";

export interface ErrorResponse {
    message: string
}

export interface ValidationErrorResponse {
    message: string
    errors: Decamelized<Record<string, string[]>>
}

export interface InternalErrorResponse {
    request_id: string;
    message: string
}

export const errorResponse = (res: Response, msg: string, code: number) => {
    const jsonObj: ErrorResponse = {
        message: msg,
    }
    return res.status(code).json(jsonObj)
}

export const validationErrorResponse = (res: Response, msg: string, errors: Record<string, string[]>) => {
    const jsonObj: ValidationErrorResponse = {
        message: msg,
        errors: decamelizeKeys(errors) as Decamelized<Record<string, string[]>>,
    }

    return res.status(422).json(jsonObj)
}

export const internalErrorResponse = (res: Response, msg: string, requestId: string) => {
    const jsonObj: InternalErrorResponse = {
        request_id: requestId,
        message: msg,
    }

    return res.status(500).json(jsonObj)
}
