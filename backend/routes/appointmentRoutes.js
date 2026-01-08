import express from "express";
import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

/**
 * ✅ PUBLIC: create appointment (patient)
 * POST /api/appointments
 */
router.post("/api/appointments", async (req, res) => {
  try {
    const { name, email, mobile, doctorId, date, time, message } = req.body;

    if (!name || !email || !mobile || !doctorId || !date || !time) {
      return res.status(400).json({ error: "name, email, mobile, doctorId, date, time are required" });
    }

    // Optional: verify doctor exists + store doctor name
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ error: "doctor not found" });

    const created = await Appointment.create({
      name,
      email,
      mobile,
      doctorId,
      doctorName: doctor.name,
      date,
      time,
      message: message || "",
      status: "pending",
    });

    return res.status(201).json(created);
  } catch (err) {
    console.error("POST /api/appointments error:", err);
    return res.status(500).json({ error: "server error" });
  }
});

/**
 * ✅ ADMIN: list all appointments
 * GET /api/appointments
 */
router.get("/api/appointments", requireAuth, requireAdmin, async (req, res) => {
  try {
    const list = await Appointment.find().sort({ createdAt: -1 });
    return res.json(list);
  } catch (err) {
    console.error("GET /api/appointments error:", err);
    return res.status(500).json({ error: "server error" });
  }
});

/**
 * ✅ ADMIN: update appointment status
 * PATCH /api/appointments/:id/status
 */
router.patch("/api/appointments/:id/status", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "invalid status" });
    }

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "appointment not found" });

    return res.json(updated);
  } catch (err) {
    console.error("PATCH /api/appointments/:id/status error:", err);
    return res.status(500).json({ error: "server error" });
  }
});

export default router;
