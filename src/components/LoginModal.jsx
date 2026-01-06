import { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ show, onHide }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      onHide();
      navigate("/dashboard"); // go to dashboard after login
    } catch (e) {
      setErr(e?.response?.data?.error || "Login failed");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {err && <Alert variant="danger">{err}</Alert>}

        <Form onSubmit={submit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
          </Form.Group>

          <Button type="submit" className="w-100">Login</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
