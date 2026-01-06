import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["user", "editor", "admin"], default: "user" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
