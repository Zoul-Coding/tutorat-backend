import express from "express";
import { createCertificate } from "../controllers/CertificateController.js";
import { verifyToken } from "../middlewares/AuthMiddlewares.js";

const router = express.Router();

router.post("/create-certificat", verifyToken, createCertificate);

export default router;
