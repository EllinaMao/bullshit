import React, { useState } from "react";
import { mutate } from "swr";
import { API_BASE_URL } from "../Api/Api.jsx";
import { INITIAL_CAR_STATE } from "./CarModel";
 
export default function CarForm() {
  const [formData, setFormData] = useState(INITIAL_CAR_STATE);
  const [isSending, setIsSending] = useState(false);
 
  const handleChange = (e) => {
    // Обработка числа для цены и года
    const value =
      e.target.name === "price" || e.target.name === "year"
        ? Number(e.target.value)
        : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
 
    try {
      await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
 
      // КЛЮЧЕВОЙ МОМЕНТ: Ревалидация списка после успешного POST
      mutate(API_BASE_URL);
      setFormData(INITIAL_CAR_STATE); // Очистка формы
    } catch (error) {
      alert("Error adding car. Check the console and CORS server settings.");
    } finally {
      setIsSending(false);
    }
  };
 
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: "20px",
        border: "1px solid #4caf50",
        borderRadius: "8px",
        marginBottom: "30px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "10px",
      }}
    >
      <h3 style={{ gridColumn: "span 2" }}>➕ Add a new vehicle</h3>
 
      <input
        name="model"
        value={formData.model}
        onChange={handleChange}
        placeholder="Model (string)"
        required
      />
      <input
        name="color"
        value={formData.color}
        onChange={handleChange}
        placeholder="Color (string)"
        required
      />
      <input
        name="year"
        type="number"
        value={formData.year}
        onChange={handleChange}
        placeholder="Year (int)"
        required
      />
      <input
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price (decimal)"
        required
      />
 
      <div style={{ gridColumn: "span 2" }}>
        <input
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Image URL (string)"
          style={{ width: "100%" }}
        />
      </div>
 
      <button
        type="submit"
        disabled={isSending}
        style={{
          gridColumn: "span 2",
          padding: "10px",
          backgroundColor: "#4caf50",
          color: "white",
          border: "none",
        }}
      >
        {isSending ? "Saving..." : "Add"}
      </button>
    </form>
  );
}