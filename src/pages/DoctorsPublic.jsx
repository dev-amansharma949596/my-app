import * as React from "react";
import { api } from "../api";
import { Avatar, Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
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

export default function DoctorsPublic() {
  const [doctors, setDoctors] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/api/doctors"); // ✅ public endpoint
        setDoctors(res.data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
    <Header />
    <section>
      <div className="container py-md-4">
        <div className="row justify-content-center">
          <div className="col-10">
             <Box sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>Our Doctors</Typography>

                {loading ? (
                  <Typography color="text.secondary">Loading...</Typography>
                ) : (
                  <Grid container spacing={2}>
                    {doctors.map((d) => (
                      <Grid item xs={3} sm={3} md={3} lg={3} key={d._id}>
                        <DoctorCard doctor={d} />
                      </Grid>
                    ))}
                    {doctors.length === 0 && (
                      <Grid item xs={12}>
                        <Typography color="text.secondary">No doctors yet.</Typography>
                      </Grid>
                    )}
                  </Grid>
                )}
              </Box>
          </div>
        </div>
      </div>
    </section>
   
    <Footer />
    </>
  );
}
