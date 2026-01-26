"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewInternalError = exports.NewConflictError = exports.NewNotFoundError = exports.NewForbiddenError = exports.NewUnauthorizedError = exports.NewBadRequestError = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode, err) {
        super(message);
        this.statusCode = statusCode;
        this.errorValue = err;
    }
}
exports.AppError = AppError;
const NewBadRequestError = (msg, err) => {
    return new AppError(msg, 400, err);
};
exports.NewBadRequestError = NewBadRequestError;
const NewUnauthorizedError = (msg, err) => {
    return new AppError(msg, 401, err);
};
exports.NewUnauthorizedError = NewUnauthorizedError;
const NewForbiddenError = (msg, err) => {
    return new AppError(msg, 403, err);
};
exports.NewForbiddenError = NewForbiddenError;
const NewNotFoundError = (msg, err) => {
    return new AppError(msg, 404, err);
};
exports.NewNotFoundError = NewNotFoundError;
const NewConflictError = (msg, err) => {
    return new AppError(msg, 409, err);
};
exports.NewConflictError = NewConflictError;
const NewInternalError = (msg, err) => {
    return new AppError(msg, 500, err);
};
exports.NewInternalError = NewInternalError;
