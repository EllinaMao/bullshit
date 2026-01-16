import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { UserCard } from "./UserCard";
import { EditUserModal } from "./EditUserModal";

const FIELD_CONFIG = {
  username: { label: "Username", type: "text" },
  email:    { label: "Email",    type: "email" },
  gender:   { label: "Gender",   type: "text" },
  age:      { label: "Age",      type: "number" },
};


const UserProfile = () => {
  const [user, setUser] = useState({
    username: "Tom",
    email: "tom@gmail.com",
    gender: "Attack Helicopter",
    age: 25,
  });

  const [editingField, setEditingField] = useState(null);

  const handleSave = (field, value) => {
    if (field === "username" && !String(value).trim()) {
      alert("Name can`t be empty!");
      return;
    }
    if (field === "email" && !String(value).includes("@")) {
      alert("Please enter a valid Email");
      return;
    }
    if (field === "age" && (Number(value) < 0 || Number(value) > 100)) {
      alert("Invalid age");
      return;
    }
    if (field === "gender" && !String(value).trim()) {
       alert("Gender can`t be empty!");
       return;
    }

    
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
    setEditingField(null); 
  };

  return (
    <div className="container mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <UserCard 
            user={user} 
            onEdit={(field) => setEditingField(field)} 
          />
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