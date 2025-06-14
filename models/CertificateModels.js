import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  schoolName: { type: String, required: true },
  diplome: { type: String, required: true },
  domaine: { type: String, required: true },
  startMonth: { type: String },
  startYear: { type: String },
  endMonth: { type: String },
  endYear: { type: String },
  description: { type: String },
}, { timestamps: true });

export const Certificate = mongoose.model("Certificate", certificateSchema);