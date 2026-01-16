import { Card, ListGroup } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { FIELD_CONFIG } from "../features/userFields/FIELD_CONFIG";

export const UserCard = ({ onEdit }) => {
  const { user } = useContext(UserContext);
  const fieldsToList = Object.keys(FIELD_CONFIG);

  return (
    <Card>
      <Card.Header as="h5">User Profile</Card.Header>
      <Card.Body>
        <ListGroup variant="flush" className="mb-3">
          {fieldsToList.map((fieldKey) => (
            <ListGroup.Item
              key={fieldKey}
              action
              onClick={() => onEdit(fieldKey)}
            >
              <strong>{FIELD_CONFIG[fieldKey].label}:</strong> {user[fieldKey]}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};
