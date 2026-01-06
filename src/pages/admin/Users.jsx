import { useEffect, useState } from "react";
import axios from "axios";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  Box,
} from "@mui/material";

const API_BASE = "http://localhost:5001";

export default function Users() {
  const [users, setUsers] = useState([]); // always array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.get(`${API_BASE}/api/users`, {
        withCredentials: true,
      });

      const data = res.data;
      const list = Array.isArray(data) ? data : data?.users ?? [];
      setUsers(list);
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        (typeof err?.response?.data === "string" ? err.response.data : "") ||
        err.message ||
        "Failed to load users";

      console.error("Fetch users error:", err?.response?.data || err.message);
      setUsers([]);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateRole = async (id, role) => {
    setUpdatingId(id);
    setError("");
    setSuccess("");

    try {
      await axios.patch(
        `${API_BASE}/api/users/${id}/role`,
        { role },
        { withCredentials: true }
      );

      setSuccess(`Role updated to "${role}"`);
      await fetchUsers(); // ✅ reload list after update
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err.message ||
        "Failed to update role";

      console.error("Update role error:", err?.response?.data || err.message);
      setError(msg);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <TableContainer component={Paper} sx={{ p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">All Users ({users.length})</Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
          {String(error).includes("missing token") && (
            <div style={{ marginTop: 6 }}>
              You are not logged in. Please login first, then open Users page.
            </div>
          )}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Created</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            users.map((u) => (
              <TableRow key={u._id}>
                <TableCell>{u.name || "-"}</TableCell>
                <TableCell>{u.email || "-"}</TableCell>

                {/* ✅ Role dropdown */}
                <TableCell>
                  <Select
                    size="small"
                    value={u.role || "user"}
                    disabled={updatingId === u._id}
                    onChange={(e) => updateRole(u._id, e.target.value)}
                    sx={{ minWidth: 140 }}
                  >
                    <MenuItem value="user">user</MenuItem>
                    <MenuItem value="editor">editor</MenuItem>
                    <MenuItem value="admin">admin</MenuItem>
                  </Select>
                </TableCell>

                <TableCell>
                  {u.createdAt ? new Date(u.createdAt).toLocaleString() : "-"}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
 