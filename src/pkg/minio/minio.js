"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.presignGetUrl = exports.deleteFile = exports.uploadFile = exports.initMinio = void 0;
const Minio = __importStar(require("minio"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT || "localhost",
    port: parseInt(process.env.MINIO_PORT || "9000"),
    useSSL: process.env.MINIO_USE_SSL === "true",
    accessKey: process.env.MINIO_ACCESS_KEY || "minioadmin",
    secretKey: process.env.MINIO_SECRET_KEY || "minioadmin",
    pathStyle: true,
});
const bucketName = process.env.MINIO_BUCKET_NAME || "toko-online";
// Ensure bucket exists
const initMinio = () => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield minioClient.bucketExists(bucketName);
    if (!exists) {
        yield minioClient.makeBucket(bucketName);
        console.log(`Bucket ${bucketName} created successfully.`);
    }
    console.log(`Bucket ${bucketName} policy set to public read.`);
    setPublic();
});
exports.initMinio = initMinio;
const setPublic = () => __awaiter(void 0, void 0, void 0, function* () {
    // Set bucket policy to public read
    const policy = {
        Version: "2012-10-17",
        Statement: [
            {
                Effect: "Allow",
                Principal: { AWS: ["*"] },
                Action: ["s3:GetObject"],
                Resource: [`arn:aws:s3:::${bucketName}/*`],
            },
        ],
    };
    yield minioClient.setBucketPolicy(bucketName, JSON.stringify(policy));
});
const uploadFile = (file, folder) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = `${folder}/${Date.now()}-${file.originalname}`;
    yield minioClient.putObject(bucketName, fileName, file.buffer, file.size, {
        "Content-Type": file.mimetype,
    });
    return {
        publicPath: `${bucketName}/${fileName}`,
        systemPath: `${fileName}`
    };
});
exports.uploadFile = uploadFile;
const deleteFile = (fileName) => __awaiter(void 0, void 0, void 0, function* () {
    yield minioClient.removeObject(bucketName, fileName);
});
exports.deleteFile = deleteFile;
exports.default = minioClient;
const presignGetUrl = (objectName_1, ...args_1) => __awaiter(void 0, [objectName_1, ...args_1], void 0, function* (objectName, expirySeconds = 3600) {
    const url = yield minioClient.presignedGetObject(bucketName, objectName, expirySeconds);
    return url.replace(`http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}`, process.env.MINIO_BASE_URL);
});
exports.presignGetUrl = presignGetUrl;
