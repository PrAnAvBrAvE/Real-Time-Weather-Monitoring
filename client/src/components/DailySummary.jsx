// client/src/components/DailySummary.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DailySummary = () => {
  const [dailyData, setDailyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDailySummaries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/weather/daily-summary');
        setDailyData(response.data);
      } catch (err) {
        setError('Failed to fetch daily summaries.');
      } finally {
        setLoading(false);
      }
    };

    fetchDailySummaries();
  }, []);

  if (loading) return <div>Loading daily summaries...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Daily Weather Summaries</h2>
      {dailyData.map((data, index) => (
        <div key={index} className="daily-summary card">
          <h3>{data._id.city} - {data._id.date}</h3>
          <p>Average Temperature: {data.avgTemp.toFixed(2)}°C</p>
          <p>Maximum Temperature: {data.maxTemp}°C</p>
          <p>Minimum Temperature: {data.minTemp}°C</p>
          <p>Dominant Condition: {data.dominantCondition}</p>
        </div>
      ))}
    </div>
  );
};

export default DailySummary;
