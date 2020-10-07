import React, {useState} from "react";

import './App.css'

const api = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const apiQuery = `${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`

  async function search(e) {
    if (e.key === "Enter") {
      const response = await fetch(apiQuery)
      const data = await response.json()
      setWeather(data)
    }
  }

  const dateBuilder = (dateStamp) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[dateStamp.getDay()];
    let date = dateStamp.getDate();
    let month = months[dateStamp.getMonth()];
    let year = dateStamp.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 20) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
        <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">
          {Math.round(weather.main.temp)}°C
          </div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
      </div>
      ) : ('')}
      </main>
    </div>
  );
}

export default App;
