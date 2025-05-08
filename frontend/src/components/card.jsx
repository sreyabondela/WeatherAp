// card.jsx
import React from "react";
import "../App.css";

function CurrentWeatherCard({ weatherData }) {
  const image = weatherData ? `http://openweathermap.org/img/w/${weatherData.currentWeather.icon}.png` : null;

  return (
    <div className="card">
      <div className="weather-data">
        <h3><u>Current Weather</u></h3>
        <p>Weather: {weatherData.weather}</p>
        {image && <img src={image} alt="weather icon" className="blinking-icon"  />}
        <p>Description: {weatherData.currentWeather.description}</p>
        <p>Temperature: {weatherData.currentWeather.temperatureCelsius}°C</p>
        <p>Humidity: {weatherData.currentWeather.humidity}%</p>
      </div>
    </div>
  );
}

function HourlyForecastCard({ hourlyForecastData }) {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  // Filter the hourlyForecastData to get forecasts for the current time or later
  const upcomingForecasts = hourlyForecastData.filter(
    (forecast) => forecast.time.split(' ')[1] >= currentTime
  );

  return (
    <div className="card">
      <div className="hourly-forecast">
        <h3><u> Forecast</u></h3>
        {upcomingForecasts.slice(0, 2).map((forecast, index) => (
          <div key={index} className="hourly-forecast-item">
            <p>Time: {forecast.time.split(' ')[1]}</p>
            <p>Temperature: {forecast.temperatureCelsius}°C</p>
            <img src={`http://openweathermap.org/img/w/${forecast.icon}.png`} alt="weather icon"  className="blinking-icon" />
            <p>Humidity: {forecast.humidity}%</p>
            {/* Add more fields from hourly forecast data */}
          </div>
        ))}
      </div>
    </div>
  );
}

function Card({ weatherData }) {
  return (
    <div className="weather-form">
      {weatherData && (
        <>
          <CurrentWeatherCard weatherData={weatherData} />
          {weatherData.hourlyForecastData && weatherData.hourlyForecastData.length > 0 && (
            <HourlyForecastCard hourlyForecastData={weatherData.hourlyForecastData} />
          )}
        </>
      )}
    </div>
  );
}

export default Card;
