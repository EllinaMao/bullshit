import { useState, useEffect } from "react";
import { Card, Button, ListGroup, Row, Col } from "react-bootstrap";
import { ModalWindow } from "./ModalWindow"; 
import FormInput from "./FormInput"; 

const UserProfile = () => {
    const [user, setUser] = useState({
        username: "Tom",
        email: "tom@mail.com",
        gender: "Male",
        age: 25
    });

    const [showModal, setShowModal] = useState(false);
    const [editForm, setEditForm] = useState(user);

    const handleOpen = () => {
        setEditForm(user); 
        setShowModal(true);
    };

    const handleChange = (field, value) => {
        setEditForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        if (!editForm.username.trim()) {
            alert("Имя не может быть пустым!");
            return;
        }
        if (!editForm.email.includes("@")) {
            alert("Введите корректный Email");
            return;
        }
        if (editForm.age < 0 || editForm.age > 120) {
            alert("Некорректный возраст");
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
                        <Card.Header as="h5">Профиль пользователя</Card.Header>
                        <Card.Body>
                            <Card.Title>{user.username}</Card.Title>
                            <Card.Text>
                                Основная информация о пользователе.
                            </Card.Text>
                            <ListGroup variant="flush" className="mb-3">
                                <ListGroup.Item><strong>Email:</strong> {user.email}</ListGroup.Item>
                                <ListGroup.Item><strong>Пол:</strong> {user.gender}</ListGroup.Item>
                                <ListGroup.Item><strong>Возраст:</strong> {user.age}</ListGroup.Item>
                            </ListGroup>
                            
                            <Button variant="primary" onClick={handleOpen}>
                                Редактировать профиль
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <ModalWindow
                show={showModal}
                onHide={() => setShowModal(false)}
                title="Редактирование данных"
                onSave={handleSave}          
                saveButtonLabel="Сохранить"
                backdrop="static"         
            >
                <form>
                    <FormInput 
                        label="Имя пользователя"
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
                        label="Пол"
                        type="text"
                        value={editForm.gender}
                        onChange={(e) => handleChange("gender", e.target.value)}
                    />

                    <FormInput 
                        label="Возраст"
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