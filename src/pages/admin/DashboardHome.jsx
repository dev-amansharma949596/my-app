import { Typography, Paper } from "@mui/material";
import { useAuth } from "../../context/AuthContext"; 
export default function DashboardHome() {
  const { user } = useAuth();

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Welcome to Dashboard
      </Typography>

      <Typography color="text.secondary">
        Logged in as: <b>{user?.email}</b> ({user?.role})
      </Typography>
    </Paper>
  );
}
