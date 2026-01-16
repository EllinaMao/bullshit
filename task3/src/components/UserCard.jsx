import { Card, ListGroup } from "react-bootstrap";

export const UserCard = ({ user, onEdit }) => {

  return (
    <Card>
      <Card.Header as="h5">User Profile</Card.Header>
      <Card.Body>
        <Card.Title className="mb-3">
          Username:{" "}
          <span 
            onClick={() => onEdit("username")}
          >
            {user.username}
          </span>
        </Card.Title>

        <ListGroup variant="flush" className="mb-3">
          <ListGroup.Item action onClick={() => onEdit("email")}>
            <strong>Email:</strong> {user.email}
          </ListGroup.Item>
          <ListGroup.Item action onClick={() => onEdit("gender")}>
            <strong>Gender:</strong> {user.gender}
          </ListGroup.Item>
          <ListGroup.Item action onClick={() => onEdit("age")}>
            <strong>Age:</strong> {user.age}
          </ListGroup.Item>
        </ListGroup>

        <div className="text-muted small">
        </div>
      </Card.Body>
    </Card>
  );
};