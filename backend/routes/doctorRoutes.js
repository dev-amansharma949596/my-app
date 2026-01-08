import express from "express";
import Doctor from "../models/Doctor.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

/**
 * ✅ PUBLIC: list doctors for frontend page
 * GET /api/doctors
 */
 router.get("/api/doctors", async (req, res) => {
  const doctors = await Doctor.find().sort({ createdAt: -1 });
  res.json(doctors);
});


/**
 * ✅ ADMIN: add doctor from dashboard
 * POST /admin/doctors
 */
router.post("/admin/doctors", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { name, email, mobile, specialist, imageUrl } = req.body;

    if (!name || !email || !mobile || !specialist) {
      return res.status(400).json({ error: "name, email, mobile, specialist are required" });
    }

    const created = await Doctor.create({
      name,
      email,
      mobile,
      specialist,
      imageUrl: imageUrl || "",
    });

    return res.status(201).json(created);
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(409).json({ error: "Doctor with this email already exists" });
    }
    return res.status(500).json({ error: err.message || "Server error" });
  }
});

export default router;
