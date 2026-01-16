import React from "react";
import useSWR from "swr";
import CarItem from "./CarItem";
import { fetcher, API_BASE_URL } from "../Api/Api.jsx";
import { useState, useMemo } from "react";
import Pagination from "./Pagination.jsx";
import Filter from "./Filter.jsx";

export default function CarList() {
  // ЧТЕНИЕ: useSWR использует API_BASE_URL в качестве ключа
  const { data: cars, error, isLoading } = useSWR(API_BASE_URL, fetcher);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" }); // { key: 'price' | 'year', direction: 'asc' | 'desc' }
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    if (value.trim() === "" || value === null) {
      setSortConfig({ key: "", direction: "" });
      return;
    }
    const [key, direction] = value.split("-");
    setSortConfig({ key, direction });
  };

  const filteredCars = useMemo(() => {
    if (!cars) return [];
    let result = [...cars];

    if (searchQuery.trim()) {
      result = result.filter((car) =>
        car.model.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (sortConfig.key) {
      result.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];

        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [cars, searchQuery, sortConfig]);

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const currentItems = filteredCars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (isLoading) return <p>⏳ Loading list of vehicles...</p>;
  if (error)
    return <p style={{ color: "red" }}>Download error: {error.message}</p>;
  if (!cars || cars.length === 0)
    return <p>No cars available. Be the first to add one!</p>;

  return (
    <div>
      <h2>List of vehicles ({filteredCars.length})</h2>
      <Filter
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        sortConfig={sortConfig}
        onSortChange={handleSortChange}
      />

      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {currentItems.map((car) => (
          // Передаем car с уникальным ID для ключа
          <CarItem key={car.id} car={car} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
