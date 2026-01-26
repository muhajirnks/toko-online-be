"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenResponse = exports.createdResponse = exports.paginationResponse = exports.successResponse = void 0;
const successResponse = (res, payload) => {
    const { data, message } = payload;
    return res.status(200).json({
        message,
        data: data ? data : undefined,
    });
};
exports.successResponse = successResponse;
const paginationResponse = (res, data) => {
    return res.status(200).json(data);
};
exports.paginationResponse = paginationResponse;
const createdResponse = (res, payload) => {
    const { data, message } = payload;
    return res.status(201).json({
        message,
        data: data ? data : undefined,
    });
};
exports.createdResponse = createdResponse;
const tokenResponse = (res, payload) => {
    const { data, message, token } = payload;
    res.cookie("access_token", token.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 5 * 60 * 60 * 1000, // 5 hours
    });
    res.cookie("refresh_token", token.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
    });
    return res.status(201).json({
        message,
        data: data,
    });
};
exports.tokenResponse = tokenResponse;
