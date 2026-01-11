import { Router } from "express";
import authRoutes from "@/modules/auth/auth.routes";

const initV1Route = () => {
   const router = Router();

   router.use("/auth", authRoutes);

   return router;
};

export default initV1Route;