import React, { useState, useEffect } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";

const WeatherApp = () => {
  const api_key = "536266bfffb7f5362a9cacd09cc0720a";
  // const api_key = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY;

  console.log(api_key);
  const [icon_url, setIconUrl] = useState(
    "http://openweathermap.org/img/wn/01d@2x.png"
  ); // Initializes with cloud icon
  const [city, setCity] = useState("Hyderabad"); // Initializes with city
  const [humidity, setHumidity] = useState(null); // Initializes with humidity
  const [pressure, setPressure] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [description, setDescription] = useState(null);
  const [feelsLike, setFeelsLike] = useState(null);
  const [temp, setTemp] = useState(null);
  const [tempMin, setTempMin] = useState(null);
  const [tempMax, setTempMax] = useState(null);
  const [location, setLocation] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [phrase, setPhrase] = useState(null);
  const [visibility, setVisibility] = useState(null);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  let latitude = 0;
  let longitude = 0;

  //  const [location, setLocation] = useState(null);
  function getWindDirection(degrees) {
    const directions = [
      "North",
      "N-E",
      "East",
      "S-E",
      "South",
      "S-W",
      "West",
      "N-W",
    ];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  }

  const search = async (lat, long) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;
      setCity("");
      if (lat) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=Metric&appid=${api_key}`;
      }
      const response = await fetch(url);
      console.log(response);
      const data = await response.json();
      console.log(data);
      
      const windDirection = getWindDirection(data.wind.deg);
      console.log(data.name);
      setLocation(data.name + ", " + data.sys.country);
      setHumidity(data.main.humidity);
      setPressure(data.main.pressure);
      setVisibility(Number(data.visibility) / 1000);
      setTempMax(Math.round(data.main.temp_max));
      setTempMin(Math.round(data.main.temp_min));
      setPhrase(data.weather[0].main);
      setWindSpeed(Math.round(data.wind.speed) + " km/h " + windDirection);
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );

      const sunriseTimestamp = data.sys.sunrise;
      const sunsetTimestamp = data.sys.sunset;

      // Convert timestamps to JavaScript Date objects
      const sunriseDate = new Date(sunriseTimestamp * 1000);
      const sunsetDate = new Date(sunsetTimestamp * 1000);

      // Format sunrise and sunset time
      const sunriseTime = sunriseDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const sunsetTime = sunsetDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setSunrise(sunriseTime);
      setSunset(sunsetTime);
      setFeelsLike(Math.round(data.main.feels_like));
      let desc = data.weather[0].description;
      desc = desc.charAt(0).toUpperCase() + desc.slice(1);
      setDescription(desc);
      setTemp(Math.round(data.main.temp));
      setIconUrl(
        `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  useEffect(() => {
    getLocation();
    const interval = setInterval(getLocation, 1 * 60 * 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
    //search(); // Call search function when component mounts
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          // setLocation({ latitude, longitude });
          // Call your API function here with latitude and longitude
          // Example: fetchData(latitude, longitude);
          console.log("Location fetched+" + latitude + "+" + longitude);
          search(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // const fetchData = async (latitude, longitude) => {
  //   try {
  //     const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`);
  //     // Handle response and update values accordingly
  //     console.log('API response:', response.data);
  //   } catch (error) {
  //     console.error('Error fetching data from API:', error);
  //   }
  // };

  return (
    <div className="App">
      <div className="AppTopBar">
        <h1>{location}</h1>
        <div className="top-bar">
          <input
            type="text"
            className="cityInput"
            placeholder="Search for a city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <div className="search-icon" onClick={search}>
            <img src={search_icon} alt="Search" className="" />
          </div>
          <div className="search-icon" onClick={getLocation}>
            <img
              src="https://img.icons8.com/material-outlined/24/marker.png"
              alt="Search"
              className=""
            />
          </div>
        </div>
        <h1>{time}</h1>
      </div>
      <div className="AppBottomBar">
        <div className="current-weather">
          <div className="current-weather-info">
            <img src={icon_url} alt="WeatherIcon" className="icon" />
            <div className="temp">
              <div className="display-temp">
                {temp}
                <sup>o</sup>
                <span className="sub">c</span>
              </div>
            </div>
          </div>
          <div className="phrase">{phrase}</div>
        </div>
        <div className="weather-details">
          <div className="items">
            <div className="item-name">Feels Like</div>
            <div className="item-value" id="feels-like">
              {feelsLike} <sup>o</sup>c
            </div>
          </div>
          <div className="items">
            <div className="item-name">Description</div>
            <div className="item-value" id="description">
              {description}
            </div>
          </div>
        </div>
        <div className="weather-details">
          <div className="items">
            <div className="item-name">Pressure</div>
            <div className="item-value" id="pressure">
              {pressure} hPa
            </div>
          </div>
          <div className="items">
            <div className="item-name">Humidity</div>
            <div className="item-value" id="humidity-percent">
              {humidity} %
            </div>
          </div>
        </div>
        <div className="weather-details">
          <div className="items">
            <div className="item-name">Wind Speed</div>
            <div className="item-value" id="wind-speed">
              {windSpeed}
            </div>
          </div>
          <div className="items">
            <div className="item-name">Visibility</div>
            <div className="item-value" id="visibility">
              {visibility} km
            </div>
          </div>
        </div>
        <div className="weather-details">
          <div className="items">
            <div className="item-name">Max Temperature</div>
            <div className="item-value" id="max-temp">
              {tempMax} <sup>o</sup>c
            </div>
          </div>
          <div className="items">
            <div className="item-name">Min Temperature</div>
            <div className="item-value" id="min-temp">
              {tempMin} <sup>o</sup>c
            </div>
          </div>
        </div>
        <div className="weather-details">
          <div className="items">
            <div className="item-name">Sunrise</div>
            <div className="item-value" id="sunrise">
              {sunrise}
            </div>
          </div>
          <div className="items">
            <div className="item-name">Sunset</div>
            <div className="item-value" id="sunset">
              {sunset}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
