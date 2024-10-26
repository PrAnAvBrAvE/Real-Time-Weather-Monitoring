const express = require('express');
const axios = require('axios');
const WeatherData = require('../models/Weather');
const https = require('https');
const router = express.Router();

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

// Fetch weather data
router.get('/fetchWeather', async (req, res) => {
  try {
    const weatherPromises = cities.map(city =>
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHERMAP_API_KEY}`, {
        httpsAgent : httpsAgent
      })
    );

    const weatherResponses = await Promise.all(weatherPromises);

    const weatherEntries = await Promise.all(weatherResponses.map(async (response) => {
      const { main, weather, dt } = response.data;
      const temp = main.temp - 273.15; // Convert from Kelvin to Celsius
      const feels_like = main.feels_like - 273.15; // Convert from Kelvin to Celsius
      const city = response.data.name;

      const alertThreshold = 35; // Example threshold
      const isAlert = temp > alertThreshold;

      const weatherEntry = new WeatherData({
        city,
        temp,
        feels_like,
        main: weather[0].main,
        dt,
        alert: isAlert,
      });

      await weatherEntry.save();
      return weatherEntry;
    }));

    res.json(weatherEntries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

// Get daily summaries
router.get('/daily-summary', async (req, res) => {
  try {
    const dailySummaries = await WeatherData.aggregate([
      {
        $group: {
          _id: {
            city: "$city",
            date: { $dateToString: { format: "%Y-%m-%d", date: { $toDate: { $multiply: ["$dt", 1000] } } } },
          },
          avgTemp: { $avg: "$temp" },
          maxTemp: { $max: "$temp" },
          minTemp: { $min: "$temp" },
          dominantCondition: { $first: "$main" }, // Assuming first entry as dominant condition
        },
      },
      { $sort: { "_id.date": 1 } },
    ]);

    res.json(dailySummaries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving daily summaries' });
  }
});

// Get triggered alerts
router.get('/alerts', async (req, res) => {
  try {
    const alerts = await WeatherData.find({ alert: true });
    res.json(alerts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving alerts' });
  }
});

router.get('/historical/:city', async (req, res) => {
  const { city } = req.params;

  try {
    const today = new Date();
    const fiveDaysAgo = new Date(today);
    fiveDaysAgo.setDate(today.getDate() - 5);
    const historicalData = await WeatherData.aggregate([
      {
        $match: {
          city: city,
          // Convert dt from Unix timestamp to Date object for comparison
          dt: { $gte: Math.floor(fiveDaysAgo.getTime() / 1000) } // Convert to seconds
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: { $toDate: { $multiply: ["$dt", 1000] } } } }, // Convert dt to date
          avgTemp: { $avg: "$temp" } // Calculate average temperature
        }
      },
      {
        $sort: { _id: 1 } // Sort by date ascending
      }
    ]);

    const formattedData = historicalData.map(item => ({
      date: item._id,
      avgTemp: item.avgTemp
    }));

    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching historical data:', error);
    res.status(500).json({ error: 'An error occurred while fetching historical data.' });
  }
});

module.exports = router;
