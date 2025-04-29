export const weatherIcons = {
  // Cerah
  0: "☀️", // Clear sky
  1: "🌤️", // Mainly clear
  2: "⛅", // Partly cloudy
  3: "☁️", // Overcast

  // Kabut
  45: "🌫️", // Foggy
  48: "🌁", // Depositing rime fog

  // Gerimis
  51: "🌦️", // Light drizzle
  53: "🌧️", // Moderate drizzle
  55: "🌧️", // Dense drizzle

  // Hujan
  61: "🌧️", // Slight rain
  63: "🌧️", // Moderate rain
  65: "🌈", // Heavy rain

  // Hujan Beku
  66: "❄️", // Light freezing rain
  67: "❄️", // Heavy freezing rain

  // Salju
  71: "❄️", // Slight snow fall
  73: "❄️", // Moderate snow fall
  75: "🌨️", // Heavy snow fall
  77: "❄️", // Snow grains

  // Hujan Badai
  80: "🌧️", // Slight rain showers
  81: "🌧️", // Moderate rain showers
  82: "🌧️", // Violent rain showers

  // Salju Badai
  85: "🌨️", // Slight snow showers
  86: "🌨️", // Heavy snow showers

  // Badai Petir
  95: "⛈️", // Thunderstorm
  96: "⛈️", // Thunderstorm with light hail
  99: "🌩️", // Thunderstorm with heavy hail
};

export const getWeatherIcon = (weatherCode) => {
  // Konversi ke integer jika diperlukan
  const code = parseInt(weatherCode);

  // Cek langsung
  if (weatherIcons[code]) {
    return weatherIcons[code];
  }

  // Cek kode utama
  const mainCode = Math.floor(code);
  if (weatherIcons[mainCode]) {
    return weatherIcons[mainCode];
  }

  // Default icon
  return "🌈";
};

// Bonus: Fungsi deskripsi cuaca
export const getWeatherDescription = (weatherCode) => {
  const descriptions = {
    0: "Cerah",
    1: "Sebagian Berawan",
    2: "Berawan",
    3: "Berawan Penuh",
    45: "Berkabut",
    48: "Embun Beku",
    51: "Gerimis Ringan",
    53: "Gerimis Sedang",
    55: "Gerimis Lebat",
    61: "Hujan Ringan",
    63: "Hujan Sedang",
    65: "Hujan Lebat",
    66: "Hujan Beku Ringan",
    67: "Hujan Beku Lebat",
    71: "Salju Ringan",
    73: "Salju Sedang",
    75: "Salju Lebat",
    77: "Butiran Salju",
    80: "Hujan Ringan",
    81: "Hujan Sedang",
    82: "Hujan Lebat",
    85: "Salju Ringan",
    86: "Salju Lebat",
    95: "Badai Petir",
    96: "Badai Petir Ringan",
    99: "Badai Petir Lebat",
  };

  const code = parseInt(weatherCode);

  if (descriptions[code]) {
    return descriptions[code];
  }

  const mainCode = Math.floor(code);
  if (descriptions[mainCode]) {
    return descriptions[mainCode];
  }

  return "Kondisi Cuaca Tidak Diketahui";
};
