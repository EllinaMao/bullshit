import SearchForm from "../components/SearchForm";
import WeatherResult from "../components/WeatherResult";
import { useState, useCallback, use } from "react";
import { useWeather } from "../hooks/useWeather";
import { useCity } from "../hooks/useCity";

const WeatherPage = () => {
    const [mode, setMode] = useState('city');
    const [city, setCity] = useState('');

    const [coordinates, setCoordinates] = useState({ latitude: '', longitude: '' });
    const [targetLocation, setTargetLocation] = useState(null);

    const { refetch: searchCity, isFetching: isCityLoading, error: cityError } = useCity(city);

    const { data: weatherData, isLoading: isWeatherLoading, error: weatherError } = useWeather(targetLocation?.lat, targetLocation?.lng);


    const handleSearch = useCallback(async () => {
        if (mode === 'city') {
            try {
                const { data: cityData } = await searchCity();
                console.log("City data received:", cityData);
                if (cityData?.results && cityData.results.length > 0) {
                    const { latitude, longitude } = cityData.results[0];
                    console.log("Setting target location:", { latitude, longitude });
                    setTargetLocation({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
                    setCoordinates({ latitude, longitude});
                } else {
                    console.log("No city data found");
                }
            }
            catch (error) {
                console.error("Error fetching city data:", error);
            }

        } else {
            const { latitude, longitude } = coordinates;
            console.log("Setting coordinates:", { latitude, longitude });
            setTargetLocation({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
        }
    }, [mode, searchCity, coordinates]);
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





