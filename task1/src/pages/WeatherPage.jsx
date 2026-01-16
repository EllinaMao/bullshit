import { useContext,useEffect } from "react";
import SearchForm from "../components/SearchForm";
import WeatherResult from "../components/WeatherResult";
import { useWeather } from "../hooks/useWeather";
import Collapse from "react-bootstrap/Collapse";
import { WeatherContext } from "../context/WeatherContext.jsx";
import { toast } from "react-toastify";

const WeatherPage = () => {
  const { location, isResultVisible } = useContext(WeatherContext);

  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    error: weatherError,
  } = useWeather(location?.lat, location?.lng);

  useEffect(() => {
    if (weatherError) {
      toast.error(`Error fetching weather data: ${weatherError.message}`);
    }
  }, [weatherError]);

  useEffect(() => {
    if (weatherData && !isWeatherLoading) {
      toast.success(`Weather data loaded for ${location?.name}`);
    }
  }, [weatherData, isWeatherLoading, location]);

  useEffect(() => {
    if (isWeatherLoading) {
      toast.info("Loading weather data...", { autoClose: 1000 });
    }
  }, [isWeatherLoading]);

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
