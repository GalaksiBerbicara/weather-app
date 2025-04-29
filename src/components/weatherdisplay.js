import React from "react";
import { getWeatherIcon } from "../utils/weatherIcons";

const WeatherDisplay = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-3xl font-bold capitalize dark:text-white">
            {weather.location}
          </h2>
          <p className="text-md text-gray-600 dark:text-gray-400">
            {new Date().toLocaleDateString("id-ID", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <span className="text-6xl">{getWeatherIcon(weather.weathercode)}</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <WeatherInfoCard
          label="Suhu"
          value={`${weather.temperature}°C`}
          icon="🌡️"
        />
        <WeatherInfoCard
          label="Kecepatan Angin"
          value={`${weather.windspeed} km/h`}
          icon="💨"
        />
        <WeatherInfoCard
          label="Arah Angin"
          value={`${weather.winddirection}°`}
          icon="🧭"
        />
        <WeatherInfoCard
          label="Cuaca"
          value={getWeatherDescription(weather.weathercode)}
          icon={getWeatherIcon(weather.weathercode)}
        />
      </div>
    </div>
  );
};

// Komponen card cuaca
const WeatherInfoCard = ({ label, value, icon }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center space-x-3 shadow-sm">
      <span className="text-3xl">{icon}</span>
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
        <p className="text-xl font-bold dark:text-white">{value}</p>
      </div>
    </div>
  );
};

// Fungsi untuk mendapatkan deskripsi cuaca
const getWeatherDescription = (weatherCode) => {
  const descriptions = {
    // Kode cuaca utama
    0: "Cerah",
    1: "Sebagian Berawan",
    2: "Berawan",
    3: "Berawan Penuh",

    // Kabut
    45: "Berkabut",
    48: "Embun Beku",

    // Gerimis
    51: "Gerimis Ringan",
    53: "Gerimis Sedang",
    55: "Gerimis Lebat",

    // Hujan
    61: "Hujan Ringan",
    63: "Hujan Sedang",
    65: "Hujan Lebat",

    // Salju
    71: "Salju Ringan",
    73: "Salju Sedang",
    75: "Salju Lebat",

    // Hujan Beku
    77: "Butiran Salju",

    // Hujan Badai
    80: "Hujan Ringan",
    81: "Hujan Sedang",
    82: "Hujan Lebat",

    // Salju Badai
    85: "Salju Ringan",
    86: "Salju Lebat",

    // Hujan Petir
    95: "Badai Petir",
    96: "Badai Petir Ringan",
    99: "Badai Petir Lebat",
  };

  // Tambahkan penanganan untuk berbagai format kode
  if (weatherCode in descriptions) {
    return descriptions[weatherCode];
  }

  // Cek kode utama
  const mainCode = Math.floor(weatherCode);
  if (mainCode in descriptions) {
    return descriptions[mainCode];
  }

  return "Kondisi Cuaca Tidak Diketahui";
};

export default WeatherDisplay;
