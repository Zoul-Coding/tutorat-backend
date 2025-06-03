import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/AuthRoutes.js";
import CertificateRoutes from "./routes/CertificateRoutes.js";
import { connectDB } from "./config/connectDB.js";

dotenv.config({ path: './config/.env' });

// Connexion à la base de données
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", authRoutes, CertificateRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});