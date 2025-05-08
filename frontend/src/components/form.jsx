import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

function Form({ setWeatherData }) {
  const [cityName, setCityName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`https://weatherbackend-lhvv.onrender.com/?city=${cityName}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <div className='weather-form'>
    <form onSubmit={handleSubmit}>
      <label>
        Enter city name:
        <input type="text" value={cityName} onChange={(e) => setCityName(e.target.value)} />
      </label>
      <button type="submit">Get Weather</button>
    </form>
    </div>
  );
}

export default Form;
