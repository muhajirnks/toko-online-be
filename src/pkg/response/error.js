"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalErrorResponse = exports.validationErrorResponse = exports.errorResponse = void 0;
const errorResponse = (res, msg, code) => {
    const jsonObj = {
        message: msg,
    };
    return res.status(code).json(jsonObj);
};
exports.errorResponse = errorResponse;
const validationErrorResponse = (res, msg, errors) => {
    const jsonObj = {
        message: msg,
        errors,
    };
    return res.status(422).json(jsonObj);
};
exports.validationErrorResponse = validationErrorResponse;
const internalErrorResponse = (res, msg, requestId) => {
    const jsonObj = {
        requestId,
        message: msg,
    };
    return res.status(500).json(jsonObj);
};
exports.internalErrorResponse = internalErrorResponse;
