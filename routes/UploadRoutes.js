import express from "express";
import { UploadProfilePhoto, getUserInfos } from "../controllers/UploadController.js";
import { upload } from "../services/upload.service.js";
import { verifyToken } from "../middlewares/AuthMiddlewares.js";

const router = express.Router();

router.post("/upload-profile", upload.single("imageUrl"), verifyToken, UploadProfilePhoto);
router.get("/user-infos", verifyToken, getUserInfos);

export default router;