import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { user, setUser, loading } = useAuth();
  const navigate = useNavigate();

  // ✅ If already logged in, go dashboard
  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, loading, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (mode === "signup") {
        await api.post("/auth/signup", { name, email, password });
        setMode("login");
        setPassword("");
        return;
      }

      const res = await api.post("/auth/login", { email, password });
      setUser(res.data.user);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.error || "Failed");
    } finally {
      setSubmitting(false);
    }
  };

  // optional: while AuthContext is loading
  if (loading) return null;

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button
          onClick={() => setMode("login")}
          style={{ flex: 1, padding: 10, fontWeight: mode === "login" ? 700 : 400 }}
        >
          Login
        </button>
        <button
          onClick={() => setMode("signup")}
          style={{ flex: 1, padding: 10, fontWeight: mode === "signup" ? 700 : 400 }}
        >
          Signup
        </button>
      </div>

      <h2 style={{ marginTop: 0 }}>{mode === "login" ? "Login" : "Create account"}</h2>

      <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
        {mode === "signup" && (
          <input
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div style={{ color: "crimson" }}>{error}</div>}

        <button disabled={submitting} type="submit" style={{ padding: 10 }}>
          {submitting ? "Please wait..." : mode === "login" ? "Login" : "Signup"}
        </button>
      </form>
    </div>
  );
}
