import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    mobile: { type: String, required: true, trim: true },

    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },

    // store as a Date (best)
    scheduledAt: { type: Date, required: true },

    reason: { type: String, trim: true, default: "" },

    status: {
      type: String,
      enum: ["pending", "successful", "cancelled"],
        default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
