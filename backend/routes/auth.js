import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production", // false on localhost
};

// ✅ SIGNUP (creates user in MongoDB)
router.post("/signup", async (req, res) => {
  try {
    const { name = "", email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "email and password required" });
    }
    if (String(password).length < 6) {
      return res.status(400).json({ error: "password must be at least 6 characters" });
    }

    const exists = await User.findOne({ email: email.toLowerCase().trim() });
    if (exists) return res.status(409).json({ error: "email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    // Make the OWNER_EMAIL an admin automatically
    const role =
      process.env.OWNER_EMAIL &&
      email.toLowerCase().trim() === process.env.OWNER_EMAIL.toLowerCase().trim()
        ? "admin"
        : "user";

    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password: hashed,
      role,
    });

    return res.status(201).json({
      ok: true,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("signup error:", err);
    return res.status(500).json({ error: "server error" });
  }
});

// ✅ LOGIN (real DB login)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "email and password required" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");
    if (!user) return res.status(401).json({ error: "invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "invalid credentials" });

    user.lastLoginAt = new Date();
    await user.save();

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, cookieOptions);

    return res.json({
      ok: true,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("login error:", err);
    return res.status(500).json({ error: "server error" });
  }
});

// ✅ LOGOUT
router.post("/logout", (req, res) => {
  res.clearCookie("token", cookieOptions);
  res.json({ ok: true });
});

// ✅ ME (who is logged in)
router.get("/me", requireAuth, async (req, res) => {
  res.json({ user: req.user });
});

export default router;
