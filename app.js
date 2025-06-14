import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/AuthRoutes.js";
import CertificateRoutes from "./routes/CertificateRoutes.js";
import ExperienceRoutes from "./routes/ExperienceController.js"
import UploadRoutes from "./routes/UploadRoutes.js";
import AnnonceRoutes from "./routes/AnnonceRoutes.js";
import { connectDB } from "./config/connectDB.js";

dotenv.config({ path: './config/.env' });

// Connexion à la base de données
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/uploads", express.static(path.resolve("uploads")));
app.use("/api", authRoutes, CertificateRoutes, ExperienceRoutes, UploadRoutes, AnnonceRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});