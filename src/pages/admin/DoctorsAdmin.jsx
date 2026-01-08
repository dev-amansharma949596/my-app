import * as React from "react";
import { api } from "../../api";
import {
  Avatar, Box, Button, Card, CardContent, Dialog, DialogActions,
  DialogContent, DialogTitle, Grid, Stack, TextField, Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function DoctorCard({ doctor }) {
  const initials = (doctor.name || "")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <Card variant="outlined" sx={{ borderRadius: 3, height: "100%" }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={doctor.imageUrl || ""} alt={doctor.name} sx={{ width: 56, height: 56 }}>
            {initials}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" noWrap>{doctor.name}</Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {doctor.specialist}
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ mt: 2, display: "grid", gap: 0.5 }}>
          <Typography variant="body2"><b>Mobile:</b> {doctor.mobile}</Typography>
          <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
            <b>Email:</b> {doctor.email}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function DoctorsAdmin() {
  const [doctors, setDoctors] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "", email: "", mobile: "", specialist: "", imageUrl: ""
  });
  const [error, setError] = React.useState("");

  const load = async () => {
    const res = await api.get("/api/doctors"); // ok to reuse public list
    setDoctors(res.data);
  };

  React.useEffect(() => { load(); }, []);

  const addDoctor = async () => {
    setError("");
    try {
  await api.post("/admin/doctors", form);
  await load();
  setOpen(false);
} catch (e) {
  const msg = e?.response?.data?.error || "Failed to add doctor";
  setError(msg);
}

  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Box>
          <Typography variant="h5">Doctors (Dashboard)</Typography>
          <Typography variant="body2" color="text.secondary">
            Add doctors here. Public page will show them.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
          Add Doctor
        </Button>
      </Stack>

      <Grid container spacing={2}>
        {doctors.map((d) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={d._id}>
            <DoctorCard doctor={d} />
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Doctor</DialogTitle>
        <DialogContent sx={{ display: "grid", gap: 2, pt: 1 }}>
          <TextField label="Name" value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
          <TextField label="Email" value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
          <TextField label="Mobile" value={form.mobile}
            onChange={(e) => setForm((p) => ({ ...p, mobile: e.target.value }))} />
          <TextField label="Specialist" value={form.specialist}
            onChange={(e) => setForm((p) => ({ ...p, specialist: e.target.value }))} />
          <TextField label="Image URL (optional)" value={form.imageUrl}
            onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))} />

          {error && <Typography color="error" variant="body2">{error}</Typography>}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={addDoctor}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
