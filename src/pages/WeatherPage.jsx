import { useState, useCallback } from "react";
import SearchForm from "../components/SearchForm";
import WeatherResult from "../components/WeatherResult";
import { useWeather } from "../hooks/useWeather";

const WeatherPage = () => {
    const [targetLocation, setTargetLocation] = useState(null);
    const [displayName, setDisplayName] = useState('');
    const [isResultVisible, setIsResultVisible] = useState(false);

    const {
        data: weatherData,
        isLoading: isWeatherLoading,
        error: weatherError
    } = useWeather(targetLocation?.lat, targetLocation?.lng);

    const handleLocationFound = useCallback((locationData) => {
        setTargetLocation({ lat: locationData.lat, lng: locationData.lng });
        setDisplayName(locationData.name || 'Selected Location');
        setIsResultVisible(true);
    }, []);

    const handleInputChange = useCallback(() => {
        setIsResultVisible(false);
    }, []);

    return (
        <div>
            <h1>Weather App</h1>
            <SearchForm
                onLocationFound={handleLocationFound}
                onInputChange={handleInputChange}
                loading={isWeatherLoading}
            />

            {weatherError && <p style={{ color: 'red' }}>Error: {weatherError.message}</p>}

            {isResultVisible && (
                <WeatherResult
                    weatherData={weatherData}
                    cityName={displayName}
                />
            )}
        </div>
    );
};

export default WeatherPage;