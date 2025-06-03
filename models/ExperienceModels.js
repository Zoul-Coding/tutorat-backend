import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  schoolName: { type: String, required: true },
  type: { type: String, required: false },
  startMonth: { type: String },
  startYear: { type: String },
  endMonth: { type: String },
  endYear: { type: String },
  description: { type: String },
}, { timestamps: true });

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;
