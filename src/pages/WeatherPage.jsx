import SearchForm from "../components/SearchForm";
import WeatherResult from "../components/WeatherResult";
import { useState, useRef, useEffect } from "react";
import { useWeather } from "../hooks/useWeather";
import { useCity } from "../hooks/useCity";

const WeatherPage = () => {
    const [mode, setMode] = useState('city');
    const [city, setCity] = useState('');

    const [coordinates, setCoordinates] = useState({ latitude: '', longitude: '' });
    const [targetLocation, setTargetLocation] = useState(null);

    const { refetch: searchCity, isFetching: isCityLoading, error: cityError } = useCity(city);

    const { data: weatherData, isLoading: isWeatherLoading, error: weatherError } = useWeather(targetLocation?.lat, targetLocation?.lng);


    const handleSearch = async () => {
        if (mode === 'city') {
            try {
                const {data: cityData} = await searchCity();
                if (cityData && cityData.length > 0) {
                    const { lat, lon } = cityData[0];
                    setTargetLocation({ lat: parseFloat(lat), lng: parseFloat(lon) });
                }
            }
            catch (error) {
                console.error("Error fetching city data:", error);
            }

        } else {
            const { latitude, longitude } = coordinates;
            setTargetLocation({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
        }
    };
    console.log("Weather data:", weatherData);
    console.log("Target location:", targetLocation);
    const isLoading = isCityLoading || isWeatherLoading;
    const error = cityError || weatherError;
    
    return (
        <div>
            <h1>Weather App</h1>
            <SearchForm
                mode={mode}
                setMode={setMode}
                city={city}
                setCity={setCity}
                coordinates={coordinates}
                setCoordinates={setCoordinates}
                onSearch={handleSearch}
                loading={isLoading}
            />
            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
            <WeatherResult weatherData={weatherData} />
        </div>
    );
};
export default WeatherPage;





