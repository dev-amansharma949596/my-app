import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    mobile: { type: String, required: true, trim: true },
    specialist: { type: String, required: true, trim: true },
    imageUrl: { type: String, default: "", trim: true },
  },
  { timestamps: true }
);

// optional (prevents duplicate emails)
doctorSchema.index({ email: 1 }, { unique: true });

export default mongoose.model("Doctor", doctorSchema);
