import { useState, useEffect } from "react";
import { Card, Button, ListGroup, Row, Col } from "react-bootstrap";
import { ModalWindow } from "./ModalWindow";
import FormInput from "./FormInput";

const UserProfile = () => {
  const [user, setUser] = useState({
    username: "Tom",
    email: "tom@gmail.com",
    gender: "Attack Helicopter",
    age: 25,
  });

  const [showModal, setShowModal] = useState(false);
  const [editForm, setEditForm] = useState(user);

  const handleOpen = () => {
    setEditForm(user);
    setShowModal(true);
  };

  const handleChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (!editForm.username.trim()) {
      alert("Name can`t be empty!");
      return;
    }
    if (!editForm.email.includes("@")) {
      alert("Please enter a valid Email");
      return;
    }
    if (editForm.age < 0 || editForm.age > 100) {
      alert("Invalid age");
      return;
    }

    setUser(editForm);
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header as="h5">User Profile</Card.Header>
            <Card.Body>
              <Card.Title>Username: {user.username}</Card.Title>
              <ListGroup variant="flush" className="mb-3">
                <ListGroup.Item>
                  <strong>Email:</strong> {user.email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Gender:</strong> {user.gender}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Age:</strong> {user.age}
                </ListGroup.Item>
              </ListGroup>

              <Button variant="primary" onClick={handleOpen}>
                Edit Profile
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ModalWindow
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Edit Data"
        backdrop="static"
        footer={
          <>
            <Button variant="primary" onClick={handleSave}>Save</Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </>
        }
      >
        <form>
          <FormInput
            label="Username"
            type="text"
            value={editForm.username}
            onChange={(e) => handleChange("username", e.target.value)}
          />

          <FormInput
            label="Email"
            type="email"
            value={editForm.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <FormInput
            label="Gender"
            type="text"
            value={editForm.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
          />

          <FormInput
            label="Age"
            type="number"
            value={editForm.age}
            onChange={(e) => handleChange("age", e.target.value)}
          />
        </form>
      </ModalWindow>
    </div>
  );
};

export default UserProfile;
