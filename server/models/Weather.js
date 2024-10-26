const mongoose = require('mongoose');

const WeatherDataSchema = new mongoose.Schema({
  city: { type: String, required: true },
  temp: { type: Number, required: true },
  feels_like: { type: Number, required: true },
  main: { type: String, required: true },
  dt: { type: Number, required: true }, // Unix timestamp
  alert: { type: Boolean, default: false }, // To track alerts
});

const WeatherData = mongoose.model('WeatherData', WeatherDataSchema);
module.exports = WeatherData;
