import React, { useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";

export default function AddDoctorModal() {
  const [show, setShow] = useState(false);

  // table list
  const [doctors, setDoctors] = useState([]);

  // form fields
  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    profile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDoctor = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      ...doctor,
    };

    setDoctors((prev) => [...prev, newDoctor]);

    // reset + close
    setDoctor({
      name: "",
      email: "",
      phone: "",
      specialization: "",
      profile: "",
    });
    setShow(false);
  };

  const handleDelete = (id) => {
    setDoctors((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="m-0">Doctors</h4>

        <button className="btn btn-outline-primary" onClick={() => setShow(true)}>
          <i className="fa fa-user-plus me-2" />
          Add Doctor
        </button>
      </div>

      {/* TABLE */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Specialization</th>
            <th>profile</th>
            <th style={{ width: 120 }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {doctors.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4">
                No doctors added yet.
              </td>
            </tr>
          ) : (
            doctors.map((d, index) => (
              <tr key={d.id}>
                <td>{index + 1}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>{d.phone}</td>
                <td>{d.specialization}</td>
                <td>{d.profile}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(d.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* MODAL FORM */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Doctor</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Doctor Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={doctor.name}
                onChange={handleChange}
                placeholder="Enter name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={doctor.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={doctor.phone}
                onChange={handleChange}
                placeholder="Enter phone"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                type="text"
                name="specialization"
                value={doctor.specialization}
                onChange={handleChange}
                placeholder="e.g. Cardiologist"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Profile</Form.Label>
              <Form.Control
                type="file"
                name="profile"
                value={doctor.profile}
                onChange={handleChange}
                placeholder="Profile URL / notes"
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Doctor
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
