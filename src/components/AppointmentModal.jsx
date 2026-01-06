import { useEffect, useState } from "react";
import { api } from "../api";

export default function AppointmentModal() {
  const [open, setOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [msg, setMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    doctorId: "",
    date: "",
    time: "",
    reason: "",
  });

  const onChange = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  // load doctors when modal opens
  useEffect(() => {
    if (!open) return;
    (async () => {
      const res = await api.get("/doctors");
      setDoctors(res.data);
      // auto-select first doctor if empty
      if (!form.doctorId && res.data?.length) {
        setForm((p) => ({ ...p, doctorId: res.data[0]._id }));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const submit = async () => {
    setMsg("");
    if (!form.name || !form.mobile || !form.doctorId || !form.date || !form.time) {
      setMsg("Please fill required fields (name, mobile, doctor, date, time).");
      return;
    }

    try {
      setSubmitting(true);
      await api.post("/appointments", form); // ✅ public endpoint
      setMsg("✅ Appointment scheduled!");
      setForm({
        name: "",
        email: "",
        mobile: "",
        doctorId: doctors?.[0]?._id || "",
        date: "",
        time: "",
        reason: "",
      });
    } catch (e) {
      setMsg(e?.response?.data?.error || "❌ Failed to schedule appointment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Your existing link */}
      <a
        href="#!"
        className="btn btn-outline-light rounded-pill py-md-3 px-md-5 mx-2"
        onClick={(e) => {
          e.preventDefault();
          setMsg("");
          setOpen(true);
        }}
      >
        Appointment
      </a>

      {/* Modal */}
      {open && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Schedule Appointment</h5>
                <button type="button" className="btn-close" onClick={() => setOpen(false)} />
              </div>

              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Name *</label>
                    <input className="form-control" value={form.name} onChange={onChange("name")} />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Mobile *</label>
                    <input className="form-control" value={form.mobile} onChange={onChange("mobile")} />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Email</label>
                    <input className="form-control" value={form.email} onChange={onChange("email")} />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Doctor *</label>
                    <select className="form-select" value={form.doctorId} onChange={onChange("doctorId")}>
                      {doctors.map((d) => (
                        <option key={d._id} value={d._id}>
                          {d.name} — {d.specialist}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-6">
                    <label className="form-label">Date *</label>
                    <input type="date" className="form-control" value={form.date} onChange={onChange("date")} />
                  </div>

                  <div className="col-6">
                    <label className="form-label">Time *</label>
                    <input type="time" className="form-control" value={form.time} onChange={onChange("time")} />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Reason</label>
                    <textarea className="form-control" rows="3" value={form.reason} onChange={onChange("reason")} />
                  </div>
                </div>

                {msg && <div className="alert alert-info mt-3 mb-0">{msg}</div>}
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setOpen(false)} disabled={submitting}>
                  Close
                </button>
                <button className="btn btn-primary" onClick={submit} disabled={submitting}>
                  {submitting ? "Saving..." : "Schedule"}
                </button>
              </div>
            </div>
          </div>
 


        </div>
      )}
    </>
  );
}
