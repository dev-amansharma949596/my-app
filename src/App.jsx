import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import RequireAuth from "./routes/RequireAuth";

import Home from "./pages/Home";
import DoctorsPublic from "./pages/DoctorsPublic";
import DoctorsAdmin from "./pages/admin/DoctorsAdmin";
import AppointmentsAdmin from "./pages/admin/AppointmentsAdmin";
import Users from "./pages/admin/Users";
import AuthPage from "./pages/AuthPage";
import DashboardHome from "./pages/admin/DashboardHome";

export default function App() {
  return (
    <Routes>
      {/* ✅ Public */}
      <Route path="/" element={<Home />} />
      <Route path="/doctors" element={<DoctorsPublic />} />
      <Route path="/auth" element={<AuthPage />} />

      {/* ✅ Protected dashboard */}
      <Route element={<RequireAuth />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/dashboard/users" element={<Users />} />
          <Route path="/dashboard/doctors" element={<DoctorsAdmin />} />
          <Route path="/dashboard/appointments" element={<AppointmentsAdmin />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
