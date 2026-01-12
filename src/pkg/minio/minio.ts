import * as Minio from "minio";
import dotenv from "dotenv";

dotenv.config();

const minioClient = new Minio.Client({
   endPoint: process.env.MINIO_ENDPOINT || "localhost",
   port: parseInt(process.env.MINIO_PORT || "9000"),
   useSSL: process.env.MINIO_USE_SSL === "true",
   accessKey: process.env.MINIO_ACCESS_KEY || "minioadmin",
   secretKey: process.env.MINIO_SECRET_KEY || "minioadmin",
});

const bucketName = process.env.MINIO_BUCKET_NAME || "toko-online";

// Ensure bucket exists
export const initMinio = async () => {
   const exists = await minioClient.bucketExists(bucketName);
   if (!exists) {
      await minioClient.makeBucket(bucketName);
      console.log(`Bucket ${bucketName} created successfully.`);
   }
};

export const uploadFile = async (
   file: Express.Multer.File
): Promise<string> => {
   const fileName = `${Date.now()}-${file.originalname}`;
   await minioClient.putObject(bucketName, fileName, file.buffer, file.size, {
      "Content-Type": file.mimetype,
   });

   // Return the URL to access the file
   const protocol = process.env.MINIO_USE_SSL === "true" ? "https" : "http";
   return `${protocol}://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${bucketName}/${fileName}`;
};

export const deleteFile = async (fileName: string) => {
   await minioClient.removeObject(bucketName, fileName);
};

export default minioClient;
