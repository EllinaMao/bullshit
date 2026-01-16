import SearchForm from "../components/SearchForm";
import WeatherResult from "../components/WeatherResult";
import { useState, useCallback, useEffect } from "react";
import { useWeather } from "../hooks/useWeather";
import { useCity } from "../hooks/useCity";

const WeatherPage = () => {
    const [mode, setMode] = useState('city');
    const [city, setCity] = useState('');
    const [coordinates, setCoordinates] = useState({ latitude: '', longitude: '' });
    const [targetLocation, setTargetLocation] = useState(null);
    const { data: cityData, isFetching: isCityLoading, error: cityError } = useCity(city);
    const { data: weatherData, isLoading: isWeatherLoading, error: weatherError } = useWeather(targetLocation?.lat, targetLocation?.lng);

    useEffect(() => {
        if (cityData && cityData.results && cityData.results.length > 0) {
            const { latitude, longitude } = cityData.results[0];
            setTargetLocation({ lat: latitude, lng: longitude });
        }
    }, [cityData]);

    useEffect(() => {
        if (mode === 'coordinates' && coordinates.latitude && coordinates.longitude) {
            setTargetLocation({ lat: parseFloat(coordinates.latitude), lng: parseFloat(coordinates.longitude) });
        }
    }, [mode, coordinates]);


    const handleSearch = useCallback(async (searchValue) => {
        if (mode === 'city') {
            setCity(searchValue);

        } else {
            setCoordinates({
                latitude: searchValue.latitude,
                longitude: searchValue.longitude
            });
        }
    }, [mode]);
    // console.log("Weather data:", weatherData);
    // console.log("Target location:", targetLocation);
    const isLoading = isCityLoading || isWeatherLoading;
    const error = cityError || weatherError;

    const coordinateHandlers = useCallback({
        latitude: (value) => setCoordinates(prev => ({ ...prev, latitude: value })),
        longitude: (value) => setCoordinates(prev => ({ ...prev, longitude: value }))
    }, [coordinates]);

    return (
        <div>
            <h1>Weather App</h1>
            <SearchForm
                mode={mode}
                setMode={setMode}
                city={city}
                setCity={setCity}
                coordinates={coordinates}
                coordinateHandlers={coordinateHandlers}
                onSearch={handleSearch}
                loading={isLoading}
            />
            {/**debug info */}
            {/* <div>{mode}
                {mode === 'city' ? ` - City: ${city}` : ` - Coordinates: ${coordinates.latitude}, ${coordinates.longitude}`}
                {isLoading && <span> Loading...</span>}
                {targetLocation && ` - Target Location: ${targetLocation.lat}, ${targetLocation.lng}`}
                {weatherData && ` - Weather fetched`}
            </div> */}

            {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
            <WeatherResult weatherData={weatherData} cityName={city} />
        </div>
    );
};
export default WeatherPage;





