import React, { useState } from 'react';
import WeatherDisplay from './components/WeatherDisplay';
import MapDisplay from './components/MapDisplay';
import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import './styles.css';

const App = () => {
  const [lat, setLat] = useState(51.505);
  const [lon, setLon] = useState(-0.09);
  const [zoom, setZoom] = useState(13);
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const handleLocationSelected = (location) => {
    setLat(location.lat);
    setLon(location.lng);
    addToHistory(location.lat, location.lng);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { lat, lon } = e.target.elements;
    const newLat = parseFloat(lat.value);
    const newLon = parseFloat(lon.value);
    setLat(newLat);
    setLon(newLon);
    addToHistory(newLat, newLon);
  };

  const addToHistory = (lat, lon) => {
    const newEntry = { lat, lon };
    const updatedHistory = [...history, newEntry];
    setHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  const handleHistoryClick = (lat, lon) => {
    setLat(lat);
    setLon(lon);
  };

  return (
    <Container className="app" maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Weather Map Application
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
          <TextField
            label="Latitude"
            name="lat"
            type="number"
            step="0.01"
            defaultValue={lat}
            required
            fullWidth
          />
          <TextField
            label="Longitude"
            name="lon"
            type="number"
            step="0.01"
            defaultValue={lon}
            required
            fullWidth
          />
          <Button variant="contained" type="submit" fullWidth>
            Update Location
          </Button>
        </Box>
      </form>
      <MapDisplay lat={lat} lon={lon} zoom={zoom} onLocationSelected={handleLocationSelected} />
      <WeatherDisplay lat={lat} lon={lon} />
      <Typography variant="h6" component="h2" gutterBottom>
        Search History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Latitude</TableCell>
              <TableCell>Longitude</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((entry, index) => (
              <TableRow key={index} onClick={() => handleHistoryClick(entry.lat, entry.lon)} style={{ cursor: 'pointer' }}>
                <TableCell>{entry.lat}</TableCell>
                <TableCell>{entry.lon}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();  
                      handleHistoryClick(entry.lat, entry.lon);
                    }}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default App;





