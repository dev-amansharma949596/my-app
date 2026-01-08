import * as React from "react";
import { api } from "../../api";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  MenuItem,
  Select,
} from "@mui/material";

export default function AppointmentsAdmin() {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const res = await api.get("/api/appointments");
      setItems(res.data);
    })();
  }, []);

  const updateStatus = async (id, newStatus, oldStatus) => {
    // optimistic UI update
    setItems((prev) =>
      prev.map((x) => (x._id === id ? { ...x, status: newStatus } : x))
    );

    try {
      await api.patch(`/admin/appointments/${id}/status`, { status: newStatus });
    } catch (err) {
      // revert if backend fails
      setItems((prev) =>
        prev.map((x) => (x._id === id ? { ...x, status: oldStatus } : x))
      );
      alert(err?.response?.data?.error || "Failed to update status");
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Appointments
      </Typography>

      <Stack spacing={2}>
        {items.map((a) => (
          <Card key={a._id} variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ gap: 2 }}
              >
                <Typography variant="h6">{a.name}</Typography>

                <Select
                  size="small"
                  value={a.status || "pending"}
                  onChange={(e) => updateStatus(a._id, e.target.value, a.status)}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="successful">Successful</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
              </Stack>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {new Date(a.scheduledAt).toLocaleString()}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                <b>Mobile:</b> {a.mobile} &nbsp; <b>Email:</b> {a.email || "-"}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                <b>Doctor:</b> {a.doctorId?.name} ({a.doctorId?.specialist})
              </Typography>

              {a.reason && (
                <Typography sx={{ mt: 1 }}>
                  <b>Reason:</b> {a.reason}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}

        {items.length === 0 && (
          <Typography color="text.secondary">No appointments yet.</Typography>
        )}
      </Stack>
    </Box>
  );
}
