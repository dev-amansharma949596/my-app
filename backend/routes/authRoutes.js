import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: false, // localhost
};

// ✅ auth middleware for /me (and any other protected auth routes)
function requireAuth(req, res, next) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: "missing token" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET); // {id,email,role}
    next();
  } catch {
    return res.status(401).json({ error: "invalid token" });
  }
}

// ✅ ME (fixes: GET /auth/me 404)
router.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

// ✅ SIGNUP (creates user in MongoDB)
router.post("/signup", async (req, res) => {
  try {
    const { name = "", email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "email and password required" });

    const exists = await User.findOne({ email: email.toLowerCase().trim() });
    if (exists) return res.status(409).json({ error: "email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    // first user becomes admin (easy)
    const usersCount = await User.countDocuments();
    const role = usersCount === 0 ? "admin" : "user";

    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password: hashed,
      role,
    });

    res.status(201).json({
      ok: true,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("signup error:", err);
    res.status(500).json({ error: "server error" });
  }
});

// ✅ LOGIN (real DB login)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "email and password required" });

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");
    if (!user) return res.status(401).json({ error: "invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "invalid credentials" });

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, cookieOptions);

    res.json({
      ok: true,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("login error:", err);
    res.status(500).json({ error: "server error" });
  }
});

// ✅ LOGOUT
router.post("/logout", (req, res) => {
  res.clearCookie("token", cookieOptions);
  res.json({ ok: true });
});

export default router;
