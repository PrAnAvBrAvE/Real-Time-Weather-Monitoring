// client/src/components/WeatherList.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherList = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/weather/fetchWeather');
        setWeatherData(response.data);
      } catch (err) {
        setError('Failed to fetch weather data.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) return <div>Loading weather data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="weather-list">
      {weatherData.map((data, index) => (
        <div key={index} className="card">
          <h3>{data.city}</h3>
          <p>Current Temperature: {data.temp}°C</p>
          <p>Feels Like: {data.feels_like}°C</p>
          <p>Main Condition: {data.main}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherList;
