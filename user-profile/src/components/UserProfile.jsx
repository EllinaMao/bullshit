import { useState, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { UserCard } from "./UserCard";
import { EditUserModal } from "./EditUserModal";
import { UserContext } from "../context/UserContext";
import { FIELD_CONFIG } from "../features/userFields/FIELD_CONFIG";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const [editingField, setEditingField] = useState(null);

  const handleSave = (fieldKey, newValue) => {
    if (fieldKey === "username" && !String(newValue).trim()) {
      toast.error("Username can`t be empty!");
      return;
    }
    if (fieldKey === "email" && !String(newValue).includes("@")) {
      toast.error("Please enter a valid Email");
      return;
    }
    if (newValue === "" || newValue === null || newValue === undefined) {
      toast.error(`${FIELD_CONFIG[fieldKey].label} cannot be empty.`);
      return;
    }
    if (
      fieldKey === "age" &&
      (Number(newValue) < 0 || Number(newValue) > 100)
    ) {
      toast.error("Invalid age");
      return;
    }
    if (fieldKey === "gender" && !String(newValue).trim()) {
      toast.error("Gender can`t be empty!");
      return;
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
          <UserCard onEdit={(field) => setEditingField(field)} />
        </Col>
      </Row>

      <EditUserModal
        fieldKey={editingField}
        initialValue={editingField && user ? user[editingField] : ""}
        config={editingField ? FIELD_CONFIG[editingField] : {}}
        onSave={handleSave}
        onClose={() => setEditingField(null)}
      />
    </div>
  );
};

export default UserProfile;
