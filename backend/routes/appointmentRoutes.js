import express from "express";
import jwt from "jsonwebtoken";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// same cookie auth middleware (protected routes)
function requireAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "missing token" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "invalid token" });
  }
}

// ✅ PUBLIC: create appointment
router.post("/appointments", async (req, res) => {
  try {
    const { name, email, mobile, doctorId, date, time, reason } = req.body;

    if (!name || !mobile || !doctorId || !date || !time) {
      return res.status(400).json({ error: "name, mobile, doctorId, date, time are required" });
    }

    const scheduledAt = new Date(`${date}T${time}`);
    if (Number.isNaN(scheduledAt.getTime())) {
      return res.status(400).json({ error: "Invalid date/time" });
    }

    const created = await Appointment.create({
      name,
      email: email || "",
      mobile,
      doctorId,
      scheduledAt,
      reason: reason || "",
    });

    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
});

// ✅ ADMIN (protected): list appointments
router.get("/admin/appointments", requireAuth, async (req, res) => {
  try {
    const items = await Appointment.find()
      .populate("doctorId", "name specialist email mobile imageUrl")
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
});

// ✅ ADMIN (protected): update status (optional but useful)
router.patch("/admin/appointments/:id/status", requireAuth, async (req, res) => {
  try {
    const { status } = req.body;

    const allowed = ["pending", "successful", "cancelled"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
});

export default router;
