import express from "express";
import Doctor from "../models/Doctor.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// --- Your same cookie auth middleware (protected routes) ---
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

// ✅ PUBLIC: list doctors for frontend page
router.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
});

// ✅ PROTECTED: add doctor from dashboard
router.post("/admin/doctors", requireAuth, async (req, res) => {
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

    res.status(201).json(created);
  } catch (err) {
    // duplicate email error (if you kept unique index)
    if (err?.code === 11000) {
      return res.status(409).json({ error: "Doctor with this email already exists" });
    }
    res.status(500).json({ error: err.message || "Server error" });
  }
});

export default router;
