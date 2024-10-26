// client/src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DailySummary from './components/DailySummary';
import AlertList from './components/AlertList';
import HistoricalTrends from './components/HistoricalTrends';
import './App.css';
import WeatherList from './components/WeatherList';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Current Temperature</Link>
          </li>
          <li>
            <Link to="/daily-summary">Daily Summary</Link>
          </li>
          <li>
            <Link to="/alerts">Alert List</Link>
          </li>
          <li>
            <Link to="/historical-trends">Historical Trends</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<WeatherList />} />
        <Route path="/daily-summary" element={<DailySummary />} />
        <Route path="/alerts" element={<AlertList />} />
        <Route path="/historical-trends" element={<HistoricalTrends />} />
      </Routes>
    </Router>
  );
};

export default App;
