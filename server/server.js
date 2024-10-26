// server.js
const express = require('express');
const mongoose = require('mongoose');
const weatherRoutes = require('./routes/weather');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors());

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// Routes
app.use('/api/weather', weatherRoutes);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
