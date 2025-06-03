import express from "express";
import { createCertificate } from "../controllers/CertificateController.js";

const router = express.Router();

router.post("/certificat", createCertificate);

export default router;
