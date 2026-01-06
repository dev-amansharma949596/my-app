import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RequireAuth() {
  const { user, loading } = useAuth();

  if (loading) return null; // or a loader
  if (!user) return <Navigate to="/" replace />;

  return <Outlet />;
}
