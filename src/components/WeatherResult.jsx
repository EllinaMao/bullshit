import { getWeatherIconName } from "../utils/getWeatherIconName";
const WeatherResult = ({ weatherData }) => {
    if (!weatherData) {
        return null;
    }
    const { temperature, windspeed, weathercode, winddirection, is_day: isDay, time } = weatherData.current_weather;
    const img = getWeatherIconName(weathercode, isDay);
    return (
        <div className={isDay ? 'day-weather' : 'night-weather'}>
            <h2>Current Weather</h2>
            <p>Temperature: {temperature}°C</p>
            <p>Windspeed: {windspeed} km/h</p>
            <p>Wind Direction: {winddirection}°</p>
            <img src={`/${img}`} alt="Weather Icon" />
            <p>Time: {time}</p>
        </div>
    );
}
export default WeatherResult;