// client/src/components/AlertList.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AlertList = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/weather/alerts');
        setAlerts(response.data);
      } catch (err) {
        setError('Failed to fetch alerts.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  if (loading) return <div>Loading alerts...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Triggered Alerts</h2>
      {alerts.length > 0 ? (
        alerts.map((alert, index) => (
          <div key={index} className="alert-item card">
            <h3>Alert for {alert.city}</h3>
            <p>Temperature: {alert.temp}°C</p>
            <p>Condition: {alert.main}</p>
            <p>Alert Triggered at: {new Date(alert.dt * 1000).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No alerts triggered.</p>
      )}
    </div>
  );
};

export default AlertList;
