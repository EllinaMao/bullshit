import React, { useState } from "react";
import { mutate } from "swr";
import { API_BASE_URL } from "../../../task3/src/Api/Api.jsx";

export default function CarItem({ car }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedCar, setUpdatedCar] = useState(car);
  const [isSending, setIsSending] = useState(false);

  // --- DELETE (Удаление) ---
  const handleDelete = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete this ${car.model} (ID: ${car.id})?`,
      )
    )
      return;
    setIsSending(true);

    try {
      // Наш эндпоинт: app.MapDelete("/api/cars/{id:int}", ...)
      await fetch(`${API_BASE_URL}/${car.id}`, { method: "DELETE" });

      // Ревалидация после DELETE (обновит CarList)
      mutate(API_BASE_URL);
    } catch (error) {
      alert("Error during deletion.");
    } finally {
      setIsSending(false);
    }
  };

  // --- PUT (Обновление) ---
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const carToSend = {
      ...updatedCar,
      price: Number(updatedCar.price),
      year: Number(updatedCar.year),
    };

    try {
      // Наш эндпоинт: app.MapPut("/api/cars/{id:int}", ...)
      await fetch(`${API_BASE_URL}/${car.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carToSend),
      });

      // Ревалидация после PUT (обновит CarList)
      mutate(API_BASE_URL);
      setIsEditing(false);
    } catch (error) {
      alert("Error while saving.");
    } finally {
      setIsSending(false);
    }
  };

  if (isEditing) {
    return (
      <form
        onSubmit={handleSave}
        style={{
          border: "1px solid #ff9800",
          padding: "15px",
          margin: "10px 0",
          backgroundColor: "#fffbe5",
        }}
      >
        <h4>Editing ID: {car.id}</h4>
        <input
          value={updatedCar.model}
          onChange={(e) =>
            setUpdatedCar({ ...updatedCar, model: e.target.value })
          }
          placeholder="Model"
          required
        />
        <input
          type="number"
          value={updatedCar.price}
          onChange={(e) =>
            setUpdatedCar({ ...updatedCar, price: e.target.value })
          }
          placeholder="Price"
          required
        />
        <button type="submit" disabled={isSending}>
          Save
        </button>
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          disabled={isSending}
        >
          Cancel
        </button>
      </form>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px",
        borderBottom: "1px dotted #ccc",
        alignItems: "center",
      }}
    >
      {car.imageUrl ? (
        <img
          src={car.imageUrl || "https://placehold.co/150?text=Car"}
          alt={car.model}
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
            marginRight: "10px",
          }}
          onError={(e) => (e.target.src = "https://placehold.co/150?text=Car")}  
        />
      ) : null}

      <div style={{ flexGrow: 1 }}>
        **{car.model}** ({car.year}, {car.color}) - **{car.price} $**
      </div>
      <div>
        <button onClick={() => setIsEditing(true)}>Change</button>
        <button
          onClick={handleDelete}
          disabled={isSending}
          style={{
            marginLeft: "10px",
            backgroundColor: "#e53935",
            color: "white",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
