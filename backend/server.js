import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { requireAuth, requireAdmin } from "./middleware/auth.js";

dotenv.config();

const app = express();
app.set("strict routing", false);

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions)); 

app.options(/.*/, cors(corsOptions));

app.use(express.json());
app.use(cookieParser());


// ✅ Auth endpoints
app.use("/auth", authRoutes);
console.log("✅ Mounting /api/users route now...");


// ✅ Admin endpoints
app.use("/api/users", requireAuth, requireAdmin, userRoutes);
console.log("✅ Mounted /api/users route.");
app.get("/api/test", (req, res) => res.json({ ok: true, port: process.env.PORT }));
app.get("/", (req, res) => res.send("Backend is running ✅"));

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 30000 });
    console.log("✅ Connected to MongoDB");

    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}

start();
