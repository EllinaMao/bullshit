import FormInput from "./FormInput";
import Radio from "./Radio";
import { useCity } from "../hooks/useCity";
import { memo, useState, useContext } from "react";
import { WeatherContext } from "../context/WeatherContext.jsx";
import { toast } from "react-toastify";

const SEARCH_OPTIONS = [
  { label: "By City", value: "city" },
  { label: "By Coordinates", value: "coordinates" },
];

const SearchForm = memo(() => {
  const { handleLocationFound, hideResult } = useContext(WeatherContext);

  const [mode, setMode] = useState("city");
  const [city, setCity] = useState("");
  const [coordinates, setCoordinates] = useState({
    latitude: "",
    longitude: "",
  });

  const {
    data: cityData,
    isFetching,
    error: cityError,
    refetch,
  } = useCity(city, 1, "en", false);
  const handleCityChange = (value) => {
    setCity(value);
    hideResult();
  };

  const handleLatChange = (value) => {
    setCoordinates((prev) => ({ ...prev, latitude: value }));
    hideResult();
  };

  const handleLngChange = (value) => {
    setCoordinates((prev) => ({ ...prev, longitude: value }));
    hideResult();
  };

  const handleModeChange = (value) => {
    setMode(value);
    hideResult();
  };

  const handleCitySearch = async () => {
    hideResult();
    if (mode === "city") {
      const result = await refetch();
      const currentData = result.data;

      if (
        currentData &&
        currentData.results &&
        currentData.results.length > 0
      ) {
        const { latitude, longitude } = currentData.results[0];
        // toast.success(`Found location for city: ${city}, lat: ${latitude}, lng: ${longitude}`);
        handleLocationFound({ lat: latitude, lng: longitude, name: city });
      } else {
        handleLocationFound(null);
        toast.error(`No results found for city: ${city}`);
      }
    }
  };

  const handleCordSearch = async () => {
    hideResult();

    if (coordinates.latitude && coordinates.longitude) {
      handleLocationFound({
        lat: parseFloat(coordinates.latitude),
        lng: parseFloat(coordinates.longitude),
        name: `coordinates: (${coordinates.latitude}, ${coordinates.longitude})`,
    });
    } else {
      toast.error("Please enter both latitude and longitude.");
    }
  };

  return (
    <div className="container mt-5">
      <Radio
        options={SEARCH_OPTIONS}
        currentValue={mode}
        onChange={handleModeChange}
        className="mb-3"
      ></Radio>
      {mode === "city" ? (
        <FormInput
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
          required
        />
      ) : (
        <>
          <FormInput
            type="number"
            value={coordinates.latitude}
            onChange={handleLatChange}
            placeholder="Enter latitude"
            required
          />
          <FormInput
            type="number"
            value={coordinates.longitude}
            onChange={handleLngChange}
            placeholder="Enter longitude"
            required
          />
        </>
      )}
      <button
        className="btn btn-primary mb-3 mx-auto d-block"
        onClick={mode === "city" ? handleCitySearch : handleCordSearch}
        disabled={isFetching}
      >
        Search
      </button>
      <div className="mt-5 mb-3">{isFetching ? "Loading..." : ""}</div>
    </div>
  );
});

export default SearchForm;
