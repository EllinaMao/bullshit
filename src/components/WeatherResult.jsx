import React from 'react';
import { getWeatherDescription } from "../utils/getWeatherDescription";
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';


const WeatherResult = React.memo(({ weatherData, cityName }) => {
    // console.log("Rendering WeatherResult component🏳‍🌈");
    if (!weatherData) {
        return null;
    }

    const { temperature, windspeed, weathercode, winddirection, is_day: isDay, time } = weatherData.current_weather;
    const weatherDescription = getWeatherDescription(weathercode);
    return (
        <Accordion defaultActiveKey="0" className={`${isDay ? 'day-weather' : 'night-weather'} container`}>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Current Weather {cityName}</Accordion.Header>
                <Accordion.Body>
                    <p>Temperature: {temperature}°C</p>
                    <p>Windspeed: {windspeed} km/h</p>
                    <p>Wind Direction: {winddirection}°</p>
                    <p>Weather: {weatherDescription}</p>
                    <p>Time: {time}</p>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
});
export default WeatherResult;

