import React from 'react';
import { getWeatherDescription } from "../utils/getWeatherDescription";
import Accordion from 'react-bootstrap/Accordion';


const WeatherResult = React.memo(({ weatherData, cityName }) => {
    // console.log("Rendering WeatherResult component🏳‍🌈");
    if (!weatherData) {
        return null;
    }

    const { temperature, windspeed, weathercode, winddirection, is_day: isDay, time } = weatherData.current_weather;
    const weatherDescription = getWeatherDescription(weathercode);
    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Current Weather: {cityName} {isDay ? '☀️' : '🌑'}</Accordion.Header>
                <Accordion.Body className="container">
                    <p className="mb-2">Temperature: {temperature}°C</p>
                    <p className="mb-2">Windspeed: {windspeed} km/h</p>
                    <p className="mb-2">Wind Direction: {winddirection}°</p>
                    <p className="mb-2">Weather: {weatherDescription}</p>
                    <p className="mb-2">Time: {time}</p>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>    
    );
});
export default WeatherResult;

