import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },          // patient name
    email: { type: String, required: true },
    mobile: { type: String, required: true },

    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    doctorName: { type: String, default: "" },       // optional convenience

    date: { type: String, required: true },          // e.g. "2026-01-05"
    time: { type: String, required: true },          // e.g. "10:30 AM"
    message: { type: String, default: "" },

    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
