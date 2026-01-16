import React from "react";
import useSWR from "swr";
import CarItem from "./CarItem";
import { fetcher, API_BASE_URL } from "../Api/Api.jsx";
 
export default function CarList() {
  // ЧТЕНИЕ: useSWR использует API_BASE_URL в качестве ключа
  const { data: cars, error, isLoading } = useSWR(API_BASE_URL, fetcher);
 
  if (isLoading) return <p>⏳ Loading list of vehicles...</p>;
  if (error)
    return <p style={{ color: "red" }}>Download error: {error.message}</p>;
  if (!cars || cars.length === 0)
    return <p>No cars available. Be the first to add one!</p>;
 
  return (
    <div>
      <h2>List of vehicles ({cars.length})</h2>
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {cars.map((car) => (
          // Передаем car с уникальным ID для ключа
          <CarItem key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
