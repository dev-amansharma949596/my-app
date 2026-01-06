import express from "express";
const app = express();
app.get("/auth/me", (req, res) => res.json({ ok: true }));
app.listen(5001, () => console.log("Test server on 5001"));
