import React from 'react';
import { getWeatherDescription } from "../utils/getWeatherDescription";
const WeatherResult = React.memo(({ weatherData, cityName }) => {
    console.error("Rendering WeatherResult component");
    if (!weatherData) {
        return null;
    }
    const { temperature, windspeed, weathercode, winddirection, is_day: isDay, time } = weatherData.current_weather;
    const weatherDescription = getWeatherDescription(weathercode);
    return (
        <div className={isDay ? 'day-weather' : 'night-weather'}>
            <h2>Current Weather {cityName}</h2>
            <p>Temperature: {temperature}°C</p>
            <p>Windspeed: {windspeed} km/h</p>
            <p>Wind Direction: {winddirection}°</p>
            <p>Weather: {weatherDescription}</p>
            <p>Time: {time}</p>
        </div>
    );
});
export default WeatherResult;

