# WeatherPulse: Real-Time Weather Monitoring System

WeatherPulse is a real-time data processing system that monitors and summarizes weather conditions using rollups and aggregates. The system retrieves data from the OpenWeatherMap API and processes weather data for major Indian metros, providing summarized insights and configurable alerts.

## Objective
Develop a system that:
- Retrieves real-time weather data.
- Processes and summarizes daily weather updates.
- Provides threshold-based alerts.

## Features
1. **Real-Time Data Retrieval**: Calls the OpenWeatherMap API at a configurable interval to fetch data for key Indian cities (Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad).
2. **Temperature Conversion**: Converts temperature from Kelvin to Celsius (or user-configured units).
3. **Daily Rollups and Aggregates**:
   - Calculates **average, maximum, and minimum temperatures**.
   - Determines the **dominant weather condition** for the day.
4. **Threshold-Based Alerts**:
   - Configurable alerts based on user-defined temperature or weather condition thresholds (e.g., alert if temperature exceeds 35°C for two consecutive updates).
5. **Visualization**: Displays daily summaries, historical trends, and triggered alerts.

## Setup Instructions
1. **API Key**: Sign up on [OpenWeatherMap](https://openweathermap.org/) and obtain a free API key.
2. **Configure API Key**:
   Add the API key to your environment variables or configuration file.
3. **Run the System**:
   ```bash
   # Install dependencies
   npm install

   # Start the server
   npm start

### Data Structure
The system focuses on the following parameters from the OpenWeatherMap API:

**main**: Main weather condition (e.g., Rain, Snow, Clear)
**temp**: Current temperature
**feels_like**: Perceived temperature
**dt**: Timestamp of the update

### API Endpoints
**/api/weather/fetchWeather**: Retrieves and processes real-time weather data for configured locations.
**/api/weather/alerts**: Triggers alerts based on threshold breaches.
**/api/weather/daily-summary**: Returns daily weather summaries and aggregates.
**/api/weather/historical/:city**: Return historical data for visualisation.

### Rollup and Aggregate Calculations
**Daily Weather Summary**:
- Average, maximum, and minimum temperatures.
- Dominant weather condition based on frequency.

**Alerts**: Triggers alerts if user-defined thresholds are breached (e.g., high temperature for consecutive updates).

### Technologies
**Frontend**: React.js
**Backend**: Node.js, Express.js
**Database**: MongoDB (for storing summaries and alert logs)
**Visualization**: Chart.js for visualizing trends and summaries

### Sample Testing
![image](https://github.com/user-attachments/assets/a1951305-ebf7-451f-9ac3-3599c9188b0f)
![image](https://github.com/user-attachments/assets/2cd663f1-3fc5-4d66-9780-79b1701c908d)

