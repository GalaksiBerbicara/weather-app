import React, { useState, useEffect } from "react";
import axios from "axios";

// Import komponen
import SearchBar from "./components/searchbar";
import WeatherDisplay from "./components/weatherdisplay";
import ForecastDisplay from "./components/forecastdisplay";
import SearchHistory from "./components/searchhistroy";

// Import utilities
import { getCurrentLocation } from "./utils/geolocation";
import { weatherService } from "./services/weatherservice";

function App() {
  // State management
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Tema dengan preferensi sistem
 const [theme, setTheme] = useState(() => {
   const savedTheme = localStorage.getItem("app-theme");
   const systemPrefersDark = window.matchMedia(
     "(prefers-color-scheme: dark)"
   ).matches;
   return savedTheme || (systemPrefersDark ? "dark" : "light");
 });

  // Effect untuk mengelola tema
  useEffect(() => {
    // Simpan tema ke localStorage
    localStorage.setItem("app-theme", theme);

    // Tambahkan/hapus kelas dark pada elemen root
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }

    // Opsional: Tambahkan transisi
    document.documentElement.classList.add("transition");
    document.documentElement.classList.add("duration-300");
  }, [theme]);

  // Fungsi toggle tema dengan efek visual yang lebih baik
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";

      // Tambahkan efek transisi
      document.documentElement.classList.add("transition");
      document.documentElement.classList.add("duration-300");

      return newTheme;
    });
  };

  // Fungsi utama untuk mencari cuaca
  const fetchWeather = async (searchLocation) => {
    setLoading(true);
    setError("");

    try {
      // Dapatkan koordinat
      const coordinates = await weatherService.getCoordinates(searchLocation);

      // Ambil data cuaca
      const weatherData = await weatherService.getCurrentWeather(
        coordinates.lat,
        coordinates.lon
      );

      // Ambil prakiraan cuaca
      const forecastData = await weatherService.getForecast(
        coordinates.lat,
        coordinates.lon
      );

      // Update state
      setWeather({
        ...weatherData.current_weather,
        location: searchLocation,
      });
      setForecast(forecastData);

      // Simpan riwayat
      updateSearchHistory(searchLocation);

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Fungsi untuk mendapatkan lokasi saat ini
  const handleCurrentLocation = async () => {
    try {
      setLoading(true);
      const location = await getCurrentLocation();
      fetchWeather(location.city);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Fungsi untuk update riwayat pencarian
  const updateSearchHistory = (newLocation) => {
    const updatedHistory = [
      ...history.filter(
        (item) => item.toLowerCase() !== newLocation.toLowerCase()
      ),
      newLocation,
    ].slice(-5);

    setHistory(updatedHistory);
    localStorage.setItem("weatherHistory", JSON.stringify(updatedHistory));
  };

  // Load riwayat dari localStorage saat komponen dimuat
  useEffect(() => {
    const savedHistory = localStorage.getItem("weatherHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  return (
    <div
      className={`
        min-h-screen 
        transition-colors 
        duration-300 
        ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }
      `}
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Tombol Theme dengan desain responsif dan informatif */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Weather App</h1>
          <div className="flex items-center space-x-2">
            {/* Label tema (opsional) */}
            <span className="text-sm hidden md:inline">
              {theme === "dark" ? "Dark" : "Light"} Mode
            </span>

            {/* Tombol toggle tema dengan animasi */}
            <button
              onClick={toggleTheme}
              className={`
                p-2 rounded-full 
                transition-all 
                duration-300 
                ${
                  theme === "dark"
                    ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }
                transform hover:scale-110
              `}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>

        {/* Komponen-komponen lainnya tetap sama */}
        <SearchBar
          onSearch={fetchWeather}
          onCurrentLocation={handleCurrentLocation}
        />

        {/* Tampilan Error */}
        {error && (
          <div
            className={`
              mt-4 p-4 rounded-lg 
              ${
                theme === "dark"
                  ? "bg-red-900 text-red-200"
                  : "bg-red-100 text-red-700"
              }
            `}
          >
            {error}
          </div>
        )}

        {/* Indikator Loading */}
        {loading && (
          <div className="flex justify-center items-center mt-6">
            <div
              className={`
                animate-spin 
                rounded-full 
                h-10 w-10 
                border-t-2 
                ${theme === "dark" ? "border-blue-400" : "border-blue-600"}
              `}
            ></div>
          </div>
        )}

        {/* Tampilan Cuaca */}
        {weather && !loading && (
          <WeatherDisplay weather={weather} theme={theme} />
        )}

        {/* Prakiraan Cuaca */}
        {forecast && !loading && (
          <ForecastDisplay forecast={forecast} theme={theme} />
        )}

        {/* Riwayat Pencarian */}
        <SearchHistory
          history={history}
          onHistoryItemClick={fetchWeather}
          theme={theme}
        />
      </div>
    </div>
  );
}

export default App;