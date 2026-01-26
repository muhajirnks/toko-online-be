"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPresignedUrl = exports.uploadPrivateFile = exports.deleteFile = exports.uploadFile = void 0;
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadFile = (file, folder) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({
            folder: process.env.CLOUDINARY_ROOT_FOLDER + '/' + folder,
            resource_type: "auto",
        }, (error, result) => {
            if (error)
                return reject(error);
            if (!result)
                return reject(new Error("Cloudinary upload failed"));
            resolve({
                publicPath: result.secure_url,
                systemPath: result.public_id,
            });
        });
        uploadStream.end(file.buffer);
    });
});
exports.uploadFile = uploadFile;
const deleteFile = (publicId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield cloudinary_1.v2.uploader.destroy(publicId);
});
exports.deleteFile = deleteFile;
/**
 * Upload file as private/authenticated
 */
const uploadPrivateFile = (file, folder) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({
            folder: process.env.CLOUDINARY_ROOT_FOLDER + '/' + folder,
            resource_type: "auto",
            type: "authenticated",
        }, (error, result) => {
            if (error)
                return reject(error);
            if (!result)
                return reject(new Error("Cloudinary upload failed"));
            resolve({
                publicPath: result.secure_url,
                systemPath: result.public_id,
            });
        });
        uploadStream.end(file.buffer);
    });
});
exports.uploadPrivateFile = uploadPrivateFile;
/**
 * Get Signed URL (Presigned URL) yang akan expired
 */
const getPresignedUrl = (publicId, expiryMinutes = 60) => {
    const expiresAt = Math.floor(Date.now() / 1000) + (expiryMinutes * 60);
    return cloudinary_1.v2.utils.private_download_url(publicId, "jpg", {
        resource_type: "image",
        type: "authenticated",
        expires_at: expiresAt
    });
};
exports.getPresignedUrl = getPresignedUrl;
exports.default = cloudinary_1.v2;
