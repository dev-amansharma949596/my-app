import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import RequireAuth from "./routes/RequireAuth";

import Home from "./pages/Home";
import DoctorsPublic from "./pages/DoctorsPublic";
import DoctorsAdmin from "./pages/admin/DoctorsAdmin";
import DashboardPage from "../src/layouts/DashboardLayout";
import AppointmentsAdmin from "./pages/admin/AppointmentsAdmin";
import Users from "./pages/admin/Users";
export default function App() {
  return (
    <Routes>
      {/* ✅ Public frontend home */}
      <Route path="/" element={<Home />} />
      <Route path="/doctors" element={<DoctorsPublic />} /> 

      {/* ✅ Protected dashboard area */}
      <Route element={<RequireAuth />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} /> 
          <Route path="/dashboard/users" element={<Users />} />
          <Route path="/dashboard/doctors" element={<DoctorsAdmin />} />
          <Route path="/dashboard/appointments" element={<AppointmentsAdmin />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
