import { useState } from 'react';
import axios from 'axios';
import './weather.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = 'ed56b14a7f27af765af91e26079a3901';
  

  const getWeather = async () => {
    if (city.trim() === '') {
      setError('Please enter a city name.');
      setWeather(null);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError('');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('City not found. Please enter a valid city name.');
      } else {
        setError('An error occurred while fetching the weather data.');
      }
      setWeather(null);
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button onClick={getWeather}>🔍</button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather">
          <h2>{weather.name}</h2>
          <div className="temp">
            <span>{Math.round(weather.main.temp)}°C</span>
            <img
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt="weather icon"
            />
          </div>
          <p className="description">{weather.weather[0].description}</p>
          <div className="details">
            <div className="humidity">💧 {weather.main.humidity}%</div>
            <div className="wind">🌬 {weather.wind.speed} Km/h</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
