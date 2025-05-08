import React, { useState } from 'react';
import Form from './form';
import Card from './card';
import '../App.css';
const WeatherForm = () => {
  const [weatherData, setWeatherData] = useState(null);

  return (
    <div className="weather-app">
      <Form setWeatherData={setWeatherData} />
       <Card weatherData={weatherData} />
    </div>
  );
};

export default WeatherForm;
