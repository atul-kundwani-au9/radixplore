import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const WeatherDisplay = ({ lat, lon }) => {
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState('metric');

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = 'a90f1b7b1d8d741442b6b46aa8c45cdd';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
      const response = await axios.get(url);
      setWeather(response.data);
    };

    fetchWeather();
  }, [lat, lon, unit]);

  if (!weather) return <Typography>Loading...</Typography>;

  const { temp, humidity } = weather.main;
  const { speed: windSpeed } = weather.wind;
  const { description, icon } = weather.weather[0];
  
  const chanceOfRain = weather.hasOwnProperty('rain') ? weather.rain['1h'] : 0;

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <Card sx={{ minWidth: 275, marginTop: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Weather Information
        </Typography>
        <Typography variant="body2">
          Temperature: {temp} {unit === 'metric' ? '°C' : '°F'}
        </Typography>
        <Typography variant="body2">Condition: {description}</Typography>
        <Typography variant="body2">Humidity: {humidity}%</Typography>
        <Typography variant="body2">Wind Speed: {windSpeed} {unit === 'metric' ? 'm/s' : 'mph'}</Typography>
        <Typography variant="body2">Chance of Rain: {chanceOfRain} mm</Typography>
        <Box
          component="img"
          sx={{ height: 80, width: 80 }}
          src={`http://openweathermap.org/img/wn/${icon}.png`}
          alt={description}
        />
        <Button variant="contained" onClick={toggleUnit} sx={{ marginTop: 1 }}>
          Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
        </Button>
      </CardContent>
    </Card>
  );
};

WeatherDisplay.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
};

export default WeatherDisplay;

