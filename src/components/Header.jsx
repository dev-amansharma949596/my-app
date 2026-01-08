import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
} from "@mui/material";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { user, loading, login, logout } = useAuth();

  const onSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      await login(email, password); // ✅ calls backend, sets cookie, loads user
      setOpen(false);
      navigate("/dashboard"); // ✅ go to dashboard after login
    } catch (e) {
      setError(e?.response?.data?.error || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  const onLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch {
      // ignore
    }
  };

  return (
    <header>
      <div className="container-fluid py-2 border-bottom d-none d-lg-block">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-lg-start mb-2 mb-lg-0">
              <div className="d-inline-flex align-items-center">
                <a className="text-decoration-none text-body pe-3" href="#!">
                  <i className="bi bi-telephone me-2" />
                  +012 345 6789
                </a>
                <span className="text-body">|</span>
                <a className="text-decoration-none text-body px-3" href="#!">
                  <i className="bi bi-envelope me-2" />
                  info@example.com
                </a>
              </div>
            </div>

            <div className="col-md-6 text-center text-lg-end">
              <div className="d-inline-flex align-items-center">
                <a className="text-body px-2" href="#!">
                  <i className="fab fa-facebook-f" />
                </a>
                <a className="text-body px-2" href="#!">
                  <i className="fab fa-twitter" />
                </a>
                <a className="text-body px-2" href="#!">
                  <i className="fab fa-linkedin-in" />
                </a>
                <a className="text-body px-2" href="#!">
                  <i className="fab fa-instagram" />
                </a>
                <a className="text-body ps-2" href="#!">
                  <i className="fab fa-youtube" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid sticky-top bg-white shadow-sm">
        <div className="container">
          <Box sx={{ p: 4 }}>
            <nav className="navbar navbar-expand-lg d-flex align-items-center bg-white navbar-light py-3 py-lg-0">
              <a href="/" className="navbar-brand">
                <h1 className="m-0 text-uppercase text-primary fs-1">
                  <i className="fa fa-clinic-medical me-2" />
                  Medinova
                </h1>
              </a>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
                aria-controls="navbarCollapse"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav ms-auto py-0">
                  <Link to="/" className="nav-item nav-link">
                    Home
                  </Link>

                  <a href="about.html" className="nav-item nav-link">
                    About
                  </a>

                  <Link to="/doctors" className="nav-item nav-link">
                    Doctors
                  </Link>

                  <a href="price.html" className="nav-item nav-link">
                    Pricing
                  </a>

                  <div className="nav-item dropdown">
                    <a
                      href="#"
                      className="nav-link dropdown-toggle"
                      data-bs-toggle="dropdown"
                      role="button"
                      aria-expanded="false"
                    >
                      Pages
                    </a>
                    <div className="dropdown-menu m-0">
                      <a href="blog.html" className="dropdown-item">
                        Blog Grid
                      </a>
                      <a href="detail.html" className="dropdown-item">
                        Blog Detail
                      </a>
                      <a href="team.html" className="dropdown-item">
                        The Team
                      </a>
                      <a href="testimonial.html" className="dropdown-item">
                        Testimonial
                      </a>
                      <a href="appointment.html" className="dropdown-item">
                        Appointment
                      </a>
                      <a href="search.html" className="dropdown-item">
                        Search
                      </a>
                    </div>
                  </div>

                  <a href="contact.html" className="nav-item nav-link me-3">
                    Contact
                  </a>

                  {/* ✅ Right side auth buttons */}
                  {!loading && !user && (
                    <>
                      <Button
                        variant="outlined"
                        sx={{ mr: 1 }}
                        component={Link}
                        to="/auth?mode=login"
                      >
                        Login
                      </Button>

                      <Button
                        variant="contained"
                        component={Link}
                        to="/auth?mode=signup"
                      >
                        Sign Up
                      </Button>
                    </>
                  )}

                  {!loading && user && (
                    <>
                      <Button
                        variant="outlined"
                        sx={{ mr: 1 }}
                        component={Link}
                        to="/dashboard"
                      >
                        Dashboard
                      </Button>

                      <Button variant="contained" color="error" onClick={onLogout}>
                        Logout
                      </Button>
                    </>
                  )}

                  {/* ✅ Login Dialog */}
                  <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    maxWidth="xs"
                    fullWidth
                  >
                    <DialogTitle>Login</DialogTitle>

                    <DialogContent sx={{ display: "grid", gap: 2, pt: 1 }}>
                      <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                      />
                      <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      {error && (
                        <Typography color="error" variant="body2">
                          {error}
                        </Typography>
                      )}
                    </DialogContent>

                    <DialogActions sx={{ p: 2 }}>
                      <Button onClick={() => setOpen(false)} disabled={submitting}>
                        Cancel
                      </Button>
                      <Button
                        onClick={onSubmit}
                        variant="contained"
                        disabled={submitting}
                      >
                        {submitting ? "Logging in..." : "Login"}
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            </nav>
          </Box>
        </div>
      </div>
    </header>
  );
}
