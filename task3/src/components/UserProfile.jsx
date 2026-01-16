import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { UserCard } from "./UserCard";
import { EditUserModal } from "./EditUserModal";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const FIELD_CONFIG = {
  username: { label: "Username", type: "text" },
  email: { label: "Email", type: "email" },
  gender: { label: "Gender", type: "text" },
  age: { label: "Age", type: "number" },
};

const UserProfile = () => {
  const {user, setUser} = useContext(UserContext);

  const [editingField, setEditingField] = useState(null);

  const handleSave = (fieldKey, newValue) => {
    if (newValue === user[fieldKey]) {
      toast.info("No changes made.");
      return;
    }
    if (newValue === "" || newValue === null || newValue === undefined) {
      toast.error(`${FIELD_CONFIG[fieldKey].label} cannot be empty.`);
      return;
    }
    if (fieldKey === "age") {
      const ageValue = Number(newValue);
      if (isNaN(ageValue) || ageValue <= 0) {
        toast.error("Age must be a positive number.");
        return;
      }
    }

    setUser((prevUser) => ({
      ...prevUser,
      [fieldKey]: newValue,
    }));

    setEditingField(null);
  };

  

  return (
    <div className="container mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <UserCard user={user} onEdit={(field) => setEditingField(field)} />
        </Col>
      </Row>

      <EditUserModal
        fieldKey={editingField}
        initialValue={editingField ? user[editingField] : ""}
        config={editingField ? FIELD_CONFIG[editingField] : {}}
        onSave={handleSave}
        onClose={() => setEditingField(null)}
      />
    </div>
  );
};

export default UserProfile;
