import { useContext } from "react";
import SearchForm from "../components/SearchForm";
import WeatherResult from "../components/WeatherResult";
import { useWeather } from "../hooks/useWeather";
import Collapse from "react-bootstrap/Collapse";
import { WeatherContext } from "../context/WeatherContext.jsx";

const WeatherPage = () => {
  const { location, isResultVisible } = useContext(WeatherContext);

  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    error: weatherError,
  } = useWeather(location?.lat, location?.lng);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Weather App</h1>
      <SearchForm loading={isWeatherLoading} />

      <Collapse in={isResultVisible}>
        <div className="mt-4">
          <WeatherResult weatherData={weatherData} cityName={location?.name} />
        </div>
      </Collapse>
    </div>
  );
};

export default WeatherPage;
