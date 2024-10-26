// client/src/components/HistoricalTrends.jsx

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart } from 'chart.js/auto';

const HistoricalTrends = () => {
  const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bengaluru', 'Kolkata', 'Hyderabad'];
  const [historicalData, setHistoricalData] = useState({});

  useEffect(() => {
    const fetchHistoricalData = async () => {
      const data = {};

      for (const city of cities) {
        try {
          const response = await axios.get(`http://localhost:5000/api/weather/historical/${city}`);
          // Store the historical data for each city
          data[city] = response.data;
        } catch (error) {
          console.error('Error fetching historical data for', city, error);
        }
      }

      setHistoricalData(data);
    };

    fetchHistoricalData();
  }, []);

  return (
    <div className="historical-trends">
      <h2>Historical Temperature Trends</h2>
      <div className="card-container">
        {cities.map((city) => (
          <div className="weather-card" key={city}>
            <h3>{city}</h3>
            <div className="chart-container">
              <Line
                data={{
                  labels: historicalData[city]?.map((data) => new Date(data.date).toLocaleDateString()) || [],
                  datasets: [
                    {
                      label: 'Average Temperature (°C)',
                      data: historicalData[city]?.map((data) => data.avgTemp) || [],
                      fill: false,
                      borderColor: 'rgba(75, 192, 192, 1)',
                      tension: 0.1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false, // Maintain aspect ratio
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'Date', // Add a title to the X-axis
                      },
                      ticks: {
                        autoSkip: true,
                        maxTicksLimit: 5, // Limit number of labels for better readability
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Temperature (°C)', // Add a title to the Y-axis
                      },
                    },
                  },
                }}
                key={city} // Ensure each chart is treated as a unique instance
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoricalTrends;
